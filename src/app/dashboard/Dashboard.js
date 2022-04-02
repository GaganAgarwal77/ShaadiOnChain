import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Certificate, download } from '../certificate.js';
import './Dashboard.css'
import { getUser, myRingNFTs, marriageCertificateTokenId } from "../services/web3";
import { getMetadataFromTokenId, uriToImageConverter, getImageFromMarriageCertTokenId } from "../services/utility";

export function Dashboard () {
  
  const [rings, setRings] = useState([]);
  const [isMarried, setIsMarried] = useState(false);
  const [marriageCertImage, setMarriageCertImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();

      if(user.married) {
        const tokenId = await marriageCertificateTokenId();
        if(!tokenId) { return; }
        const image = await getImageFromMarriageCertTokenId(tokenId);
        setMarriageCertImage(image);
        setIsMarried(true);
      }
    }

    const fetchNFTs = async () => {
        const ringNFTArray = await myRingNFTs();
        ringNFTArray.forEach(async nft => {
            var myNFT = await getMetadataFromTokenId(nft.tokenId);
            myNFT.image = uriToImageConverter(myNFT.image);
            myNFT.tokenId = nft.tokenId;
            setRings((arr) => [...arr, myNFT]);
          }
        );
    };

    fetchData();
    fetchNFTs();
}, []);


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
                          <img src={marriageCertImage}></img>
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
                    <img src="/assets/images/trees/svgs/3.svg" alt="TREE" style={{height:"50vh"}} className='mb-4'/>
                  </Container>
              </div>
        }
        <h4 className="card-title">Your Ring NFTs</h4>
          <Row xs={1} md={2} className="g-4">
            {rings.map((ring) => (
              <Col style={{marginLeft:"0vw"}}>
                <Card style={{minWidth:"20vw",maxWidth:"20vw", margin:"10px", borderRadius:"5%", borderColor:"gray", borderStyle:"dashed"}}>
                  <Card.Img variant="top" src={ring.image} style={{width:"90%", marginLeft:"5%", marginTop:"5%", borderRadius:"5%"}}/>
                  <Card.Body>
                    <Card.Title>#{ring.tokenId} {ring.name}</Card.Title>
                    <Card.Text>
                        {ring.description}
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