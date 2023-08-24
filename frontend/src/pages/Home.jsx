import React from "react";
import "../styles/home.css"
import { Container, Row, Col } from "reactstrap";

import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import Subtitle from "./../shared/Subtitle";
import experienceImg from "../assets/images/experience.png"
import MasonryImagesGallery from "../components/image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";

import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import Newsletter from "../shared/Newsletter";

const Home = () => {
    return (
        <>
            {/*----------------hero section---------------- */}
            <section>
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className="hero__content">
                                <div className="hero__subtitle d-flex align-items-center">
                                    <Subtitle subtitle={"Know Before You Go"} />
                                    <img src={worldImg} alt="worldimage" />
                                </div>
                                <h1>Traveling opens the door to creating <span className="highlight">
                                    memories</span></h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus rerum doloremque, modi dolore itaque similique totam voluptatibus error expedita excepturi qui cumque sunt magnam harum. Fuga dicta maiores perspiciatis labore?</p>
                            </div>
                        </Col>

                        <Col lg="2">
                            <div className="hero__img-box">
                                <img src={heroImg} alt="heroimg" />
                            </div>
                        </Col>

                        <Col lg="2">
                            <div className="hero__img-box hero__video-box mt-4">
                                <video src={heroVideo} alt="" controls />
                            </div>
                        </Col>

                        <Col lg="2">
                            <div className="hero__img-box mt-5">
                                <img src={heroImg02} alt="heroimg" />
                            </div>
                        </Col>

                        <SearchBar />
                    </Row>
                </Container>
            </section>

            {/*============ Hero section Start ====================*/}

            <section>
                <Container>
                    <Row>
                        <Col lg="3">
                            <h5 className="services__subtitle">What we serve</h5>
                            <h2 className="services__title">We offer our best services</h2>
                        </Col>
                        <ServiceList />
                    </Row>
                </Container>
            </section>

            {/*============ Featured Tour section starts ====================*/}

            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5">
                            <Subtitle subtitle={"Explorer"} />
                            <h2 className="featured__tour-title">Our featured tours</h2>
                        </Col>
                        <FeaturedTourList />
                    </Row>
                </Container>
            </section>

            {/*============ Experience section starts ====================*/}

            <section>
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className="experience__content">
                                <Subtitle subtitle={"Experience"} />
                                <h2 className="featured__tour-title">With all our experience <br />
                                    we will serve you.
                                </h2>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />
                                    Nam incidunt ipsam mollitia in delectus nemo!
                                </p>
                            </div>

                            <div className="counter__wrapper d-flex align-items-center gap-5">
                                <div className="counter__box">
                                    <span>12k+</span>
                                    <h6>Successful Trip</h6>
                                </div>
                                <div className="counter__box">
                                    <span>2k+</span>
                                    <h6>Regular clients</h6>
                                </div>
                                <div className="counter__box">
                                    <span>15</span>
                                    <h6>Years experience</h6>
                                </div>
                            </div>
                        </Col>
                        <Col lg='6'>
                            <div className="experience__img">
                                <img src={experienceImg} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/*============ Gallery section starts ====================*/}

            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <Subtitle subtitle={"Gallery"} />
                            <h2 className="gallery__title">Visit our customers tour gallery</h2>
                        </Col>
                        <Col lg='12'>
                            <MasonryImagesGallery />
                        </Col>
                    </Row>
                </Container>
            </section>


            {/*============ Testimonials section starts ====================*/}

            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <Subtitle subtitle={"Fans Love"}/>
                            <h2 className="testimonial__title">What our fans say about us</h2>
                        </Col>
                        <Col lg='12'>
                            <Testimonials />
                        </Col>
                    </Row>
                </Container>
            </section>


            {/*============ Newsletter  section starts ====================*/}

            <Newsletter />

            {/*============ Newsletter  section starts ====================*/}




        </>
    );
};

export default Home;