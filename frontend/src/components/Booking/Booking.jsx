import React, {useState, useContext} from 'react';
import './booking.css';

import {Form, ListGroup, FormGroup, ListGroupItem, Button} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import Swal from 'sweetalert2';

const Booking = ({tour, avgRating}) => {

    const {price, reviews, title} = tour;

    const navigate = useNavigate()

    const {user} = useContext(AuthContext)

    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: title,
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt:'',
    })

    const handleChange = e=>{
        setBooking(prev => ({...prev, [e.target.id]:e.target.value}))
    }


    const serviceFee = 10
    const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)

    // send data

    const handleClick = async e=>{
        e.preventDefault()

        console.log(booking);

        try {
            if(!user || user === undefined || user===null){
                Swal.fire({
                    title: 'Please Sign In',
                    text: 'You need to sign in to create a booking',
                    icon: 'error',
                  });
                  return;
            }

            const res = await fetch(`${BASE_URL}/booking`,{
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(booking)
            });

            const result = await res.json()

            if(!res.ok){
                Swal.fire({
                    title: 'Error',
                    text: result.message,
                    icon: 'error',
                  });
                return;
            }
            
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
              });
        }


        navigate('/thank-you');
    }


  return (
    <div className="booking">
        <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>${price}<span>/per person</span></h3>
            <span className='tour__rating d-flex align-items-center'>
                <i class='ri-star-s-fill'></i>
                {avgRating === 0 ? null : avgRating} ({reviews?.length})
            </span>
        </div>

        {/*--------------------Booking Form Starts-------------------*/}

        <div className="booking__form">
            <h5>Information</h5>

            <Form className="booking__info-form" onSubmit={handleClick}>
                <FormGroup>
                    <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <input type="number" placeholder='Phone' id='phone' required onChange={handleChange}/>
                </FormGroup>
                <FormGroup className='d-flex align-items-center gap-3'>
                    <input type="date" placeholder='' id='bookAt' required onChange={handleChange}/>
                    <input type="number" placeholder='Guest' id='guestSize' required onChange={handleChange}/>
                </FormGroup>
            </Form>
        </div>

        {/*--------------------Booking Form Ends-------------------*/}

        {/*--------------------Booking Bottom starts-------------------*/}

        <div className="booking__bottom">
            <ListGroup>
                <ListGroupItem className='border-0 px-0'>
                    <h5 className='d-flex align-items-center gap-1'>
                        ${price} <i class='ri-close-line'></i> 1 person
                    </h5>
                    <span>${price}</span>
                </ListGroupItem>

                <ListGroupItem className='border-0 px-0'>
                    <h5>Service charge</h5>
                    <span>${serviceFee}</span>
                </ListGroupItem>

                <ListGroupItem className='border-0 px-0 total'>
                    <h5>Total</h5>
                    <span>${totalAmount}</span>
                </ListGroupItem>
            </ListGroup>

            <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
        </div>
    </div>
  )
}

export default Booking