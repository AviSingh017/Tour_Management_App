import React, { useState, useRef, useEffect, useContext} from "react";
import '../styles/tour-details.css';

import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from "../utils/avgRating";

import avatar from '../assets/images/avatar.jpg';
import Booking from "../components/Booking/Booking";
import Newsletter from '../shared/Newsletter';
import useFetch from "../hooks/useFetch";
import { BASE_URL } from '../utils/config';
import {AuthContext} from './../context/AuthContext';
import Swal from 'sweetalert2';

const TourDetails = () => {

    const { id } = useParams();
    const reviewMsgRef = useRef('')
    const [tourRating, setTourRating] = useState(null);
    const {user} = useContext(AuthContext)
    const { data: tour, loading,error } = useFetch(`${BASE_URL}/tours/${id}`);

    const { photo, title, desc, price, address, reviews, distance, city, maxGroupSize } = tour

    const { totalRating, avgRating } = calculateAvgRating(reviews);

    const options = { day: 'numeric', month: 'long', year: 'numeric' }

    const submitHandler = async e => {
        e.preventDefault()
        const reviewText = reviewMsgRef.current.value;

        try {

            if(!user || user===undefined || user===null){
                Swal.fire({
                    title: 'Please Sign In',
                    text: 'You need to sign in to submit a review.',
                    icon: 'error',
                  });
                  return;
            }

            const reviewObj = {
                username: user?.username,
                reviewText,
                rating: tourRating
            }

            console.log("Review Object:", reviewObj);

            const res = await fetch(`${BASE_URL}/review/${id}`,{
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(reviewObj)
            });

            console.log("Fetch Response:", res);

            const result = await res.json()
            console.log("Response:", result);

            if(!res.ok){
                Swal.fire({
                    title: 'Error',
                    text: result.message,
                    icon: 'error',
                  });
                return;
            } 

            Swal.fire({
                title: 'Review Submitted',
                text: 'Thank you for your review!',
                icon: 'success',
                timer: 3000, // Auto-close the popup after 3 seconds
                showConfirmButton: false,
              }).then(() => {
                // Reload the page after the popup is closed
                window.location.reload();
              });
            
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
              });
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [tour])


    return <>

        <section>
            <Container>
                {
                    loading && <h4 className="text-center pt-5">Loading......</h4>
                }
                {
                    error && <h4 className="text-center pt-5">{error}</h4>
                }

                {
                    !loading && !error && <Row>
                        <Col lg='8'>
                            <div className="tour__content">
                                <img src={photo} alt="" />

                                <div className="tour__info">
                                    <h2>{title}</h2>

                                    <div className="d-flex align-items-center gap-5">
                                        <span className='tour__rating d-flex align-items-center gap-1'>
                                            <i class="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i> {avgRating === 0 ? null : avgRating}
                                            {totalRating === 0 ? ("Not rated") : (<span>({reviews?.length})</span>)}
                                        </span>
                                        <span>
                                            <i class='ri-map-pin-user-fill'></i>{address}
                                        </span>
                                    </div>


                                    <div className="tour__extra-details">
                                        <span><i class='ri-map-pin-2-line'></i>{city}</span>
                                        <span><i class='ri-money-dollar-circle-line'></i>${price} /per person</span>
                                        <span><i class='ri-map-pin-time-line'></i>{distance} k/m</span>
                                        <span><i class='ri-group-line'></i>{maxGroupSize} people</span>
                                    </div>

                                    <h5>Description</h5>
                                    <p>{desc}</p>
                                </div>

                                {/*--------------------tour reviews section starts here--------------*/}


                                <div className="tour__reviews mt-4">
                                    <h4>Reviews ({reviews?.length} reviews)</h4>

                                    <Form onSubmit={submitHandler}>
                                        <div className=" rating__group d-flex align-items-center gap-3 mb-4">
                                            <span onClick={() => setTourRating(1)}>1 <i class='ri-star-s-fill'></i></span>
                                            <span onClick={() => setTourRating(2)}>2 <i class='ri-star-s-fill'></i></span>
                                            <span onClick={() => setTourRating(3)}>3 <i class='ri-star-s-fill'></i></span>
                                            <span onClick={() => setTourRating(4)}>4 <i class='ri-star-s-fill'></i></span>
                                            <span onClick={() => setTourRating(5)}>5 <i class='ri-star-s-fill'></i></span>
                                        </div>

                                        <div className="review__input">
                                            <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts" required />
                                            <button className="btn primary__btn text-white" type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </Form>


                                    <ListGroup className="user__reviews">
                                        {
                                            reviews?.map(review => (
                                                <div className="review__item">
                                                    <img src={avatar} alt="" />

                                                    <div className="w-100">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div>
                                                                <h5>{review.username}</h5>
                                                                <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                                                            </div>

                                                            <span className="d-flex align-items-center">
                                                                {review.rating}
                                                                <i class='ri-star-s-fill'></i>
                                                            </span>
                                                        </div>

                                                        <h6>{review.reviewText}</h6>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </ListGroup>
                                </div>


                                {/*--------------------tour reviews section ends here--------------*/}
                            </div>
                        </Col>

                        <Col lg='4'>
                            <Booking tour={tour} avgRating={avgRating} />
                        </Col>
                    </Row>
                }
            </Container>
        </section>
        <Newsletter />
    </>;
};

export default TourDetails;