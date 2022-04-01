import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Slider from "react-slick";
import { TodoListComponent } from '../apps/TodoList'
import { VectorMap } from "react-jvectormap"
import {Container, Row, Col, Card } from 'react-bootstrap';
import { Certificate, download } from '../certificate.js';
import './Dashboard.css'
const mapData = {
  "IN": 10,
  "BZ": 50,
  "US": 20,
  "AU": 30,
  "GB": 40,
  "GE": 60
}


export function Dashboard () {

    let isMarried = true
    let treeMinted = true
    let marriageMinted = true
    return (
      <div>
        <div className="row">
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Love Letters Sent</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">12</h2>
                      {/* <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p> */}
                    </div>
                    <h6 className="text-muted font-weight-normal">+10% Since last month</h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <img src="/assets/images/wedding-img/icon/love-letter.png" alt="Rings" width="50" className='mb-4'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Love Letters Recieved</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">15</h2>
                      <p className="text-success ml-2 mb-0 font-weight-medium"></p>
                    </div>
                    <h6 className="text-muted font-weight-normal"> +20% Since last month</h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <img src="/assets/images/wedding-img/icon/love-letter2.png" alt="Rings" width="50" className='mb-4'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Ring NFTs Owned</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">4</h2>
                      <p className="text-danger ml-2 mb-0 font-weight-medium"></p>
                    </div>
                    <h6 className="text-muted font-weight-normal">+50% Since last month</h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <img src="/assets/images/wedding-img/icon/rings.png" alt="Rings" width="50" className='mb-4'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className='row'>
        <div className="col-12 grid-margin">
            <div className='card'>
              <div className='card-body'>
              <h4 className="card-title">YOUR NFTs</h4>
              {!marriageMinted &&
                          <div className="purchase__detailsBuy">
                            <h4 className="card-title">Your Marriage Certificate</h4>
                          <button onClick={() => {alert("Minted!")}}>
                              Claim Your Marriage Certificate
                          </button>
                      </div>
              }
              
              {isMarried && marriageMinted &&
              <div>
                    <h4 className="card-title">Your Marriage Certificate</h4>
              <Container style={{marginLeft:"15%"}}>
                          <Certificate style={{width:"50vw"}} width='700' height='500' 
                          groom_name= "Vicky Kaushal" bride_name="Katrina Kaif"
                          groom_vows= "Vicky Kaushal loves Katrina Kaif" bride_vows="Katrina Kaif loves Vicky Kaushal" is_proposal='false'/>
                          <br/>
                          <button className="btn btn-primary mb-5" style={{marginLeft:"30%"}} onClick={() => {download();} }><i className="mdi mdi-file-check btn-icon-prepend"></i>Download</button>
              </Container>
              </div>
        }
                      {!treeMinted &&
                          <div className="purchase__detailsBuy">
                             <h4 className="card-title">Your Tree NFT</h4>
                          <button style={{marginLeft:"calc(50% - 106.4px)"}}onClick={() => {alert("Minted!")}}>
                              Claim Your Tree NFT
                          </button>
                      </div>
              }
                      {isMarried && treeMinted &&
              <div>
                    <h4 className="card-title">Your Tree NFT</h4>
              <Container style={{marginLeft:"35%"}}>
                          <img src="/assets/images/tree_of_life.png" alt="TREE" style={{height:"50vh"}} className='mb-4'/>
{/* 
                          <Certificate style={{width:"50vw"}} width='700' height='500' 
                          groom_name= "Vicky Kaushal" bride_name="Katrina Kaif"
                          groom_vows= "Vicky Kaushal loves Katrina Kaif" bride_vows="Katrina Kaif loves Vicky Kaushal" is_proposal='false'/>
                          <br/>
                          <button className="btn btn-primary" style={{marginLeft:"30%"}} onClick={() => {download();} }><i className="mdi mdi-file-check btn-icon-prepend"></i>Download</button> */}
              </Container>
              </div>
        }
        <h4 className="card-title">Your Ring NFTs</h4>
<Row xs={1} md={2} className="g-4">
  {Array.from({ length: 3 }).map((_, idx) => (
    <Col style={{marginLeft:"0vw"}}>
      <Card style={{minWidth:"20vw",maxWidth:"20vw", margin:"10px", borderRadius:"5%", borderColor:"gray", borderStyle:"dashed"}}>
        <Card.Img variant="top" src={require("../../assets/rings/male/"+(idx+1)+  ".png")} style={{width:"90%", marginLeft:"5%", marginTop:"5%", borderRadius:"5%"}}/>
        <Card.Body>
          <Card.Title>Ring {idx}</Card.Title>
          <Card.Text>
              Ring Description
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
              </div>
            </div>
          </div>
        </div>
        
      </div> 
    );
  }

export default Dashboard;