import React from 'react';
import {Container,Row,Col} from 'reactstrap'
const About = () => (
    <section className="wedding format">
        <Container>
            <Row>
                <Col md="8"  className="offset-md-2">
                    <div className="title">
                        <img alt="" className="img-fluid title-img"
                            src="/assets/images/wedding-img/bottom.png" />
                        <div className="main-title">
                            <h2 className="gradient-text">Hear from a Happy Couple who had a ShaadiOnChain </h2>
                        </div>
                        {/* <div className="sub-title">
                            <p>A beautiful app for consectetur adipisicing elit, sed do eiusmod tempor incididunt ut mollit
                            anim id est laborum. Sedut perspiciatis unde omnis.</p>
                        </div> */}
                    </div>
                </Col>
                <Col xl="4" md="6" className="offset-xl-2">
                    <img alt="" className="img-fluid about-img" src="/assets/images/wedding-img/wedding-photo.jpeg" />
                </Col>
                <Col xl="4" lg="6" md="6">
                    <div className="center-text">
                        <div>
                            {/* <div className="format-small-text">
                                <h6># Love Bird</h6>
                            </div> */}
                            <div className="format-head-text">
                                <h3 className="about-font-header gradient-text">Our Story</h3>
                            </div>
                            <div className="format-sub-text">
                                <p className="about-para">
                                   We met via the internet, and had this amazing dream to have our wedding registered on blockchain.
                            </p>
                                <p className="about-para">
                                    We then found out about ShaadiOnChain where we were able to happily register our wedding with ease and also take advantage of it's many amazing features.
                            </p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
)

export default About;