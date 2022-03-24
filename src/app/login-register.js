import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col, Form, } from 'react-bootstrap'

const Contact1 = () => {


    useEffect(() => {
        document.body.style.setProperty('--primary', '#c0882f')
        document.body.style.setProperty('--secondary', '#595959')
        document.body.style.setProperty('--light', '#BF862D')
        document.body.style.setProperty('--dark', '#ECC878')
    })

    const register = async (event) => {
    };
    
    const connect = async (event) => {

    };

    const handleNameChange = (event) => {
    }

    const handleGenderChange = (event) => {
    }

    return (
    <Fragment>
        <section className="p-b-0 wedding inner-pagetitle">
            <Container>
                <Row>
                    <Col xs="12">
                        <div className="title title2 title-inner">
                            <div className="main-title">
                                <h2 className="font-primary borders text-center main-text text-uppercase my-0">
                                    <span className='gradient-text'>Register / Login</span></h2>
                            </div>
                        </div>
                        <div className="title title3">
                            <div className="main-title">
                                <p className="text-white">Register now on the best <span>on-chain wedding</span> platform.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <footer className="event contact set-relative bg-about p-b-0 event-gradient" id="contact">
            <Container className="p-b-50">
                <Row>
                    {/* <Col md="10" className="offset-md-1">
                        <div className="title title3">
                            <div className="main-title">
                            </div>

                        </div>
                    </Col> */}
                    {/* <Col xl="5" md="6" className="offset-xl-1 p-r-0 map">
                        <div className="iframe-container">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319"
                            ></iframe>
                        </div>
                    </Col> */}
                    <Col xl="6" md="6" className="offset-md-3 set-z-index form-footer">
                        <div className="bg-white">
                            <Form className='wedding'>
                                {/* <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label htmlFor="name">Name *</Label>
                                            <Input className="form-control" id="name" type="text" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label htmlFor="Phone">Phone *</Label>
                                            <Input className="form-control" id="Phone" type="text" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label htmlFor="Email">Email *</Label>
                                            <Input className="form-control" id="Email" type="text" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label htmlFor="Subject">Subject *</Label>
                                            <Input className="form-control" id="Subject" type="text" />
                                        </FormGroup>
                                    </Col>
                                </Row> */}
                                <Form.Group>
                                    <Form.Label htmlFor="Message" className='gradient-text'>Name *</Form.Label>
                                    <Form.Control className="form-control" id="Name" type="text" onChange={handleNameChange}/>
                                </Form.Group>
                                <Form.Group>
                                <Form.Label className='gradient-text'>Gender *</Form.Label>
                                <Form.Control as="select" onChange={handleGenderChange}>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </Form.Control>
                                </Form.Group>
                                <button type="submit" className="btn btn-default btn-block btn-gradient text-white" onClick={register}>Register</button>
                            
                                
                                <p style={{textAlign:'center', fontSize:'20px', paddingTop:'10px', paddingBottom:'10px', color:'#7f7d7d'}}>- or -</p>

                                <button className="btn btn-default btn-block btn-primary " onClick={connect}><img src="assets/images/metamask.svg" alt="MetaMask" width="30" height="30" /> Login with MetaMask</button>


                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
            <img alt="" className="set-abs  plane2" src="../assets/images/wedding-img/icon/couple1.png" />
            {/* <img alt="" className="set-abs bottom-0 plane" src="../assets/images/event/footer/1.png" /> */}
        </footer>
    </Fragment>
    )
}


export default Contact1;