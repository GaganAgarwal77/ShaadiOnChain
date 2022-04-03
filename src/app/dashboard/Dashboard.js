import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Dashboard.css'
import { loadAccount, getUser, myRingNFTs, marriageCertificateTokenId, mintTree, fetchTreeTokenId } from "../services/web3";
import { getMetadataFromTokenId, uriToImageConverter, getImageFromMarriageCertTokenId, getTreeImageFromTokenId, getMetadataFromGeneralContractTokenUri } 
  from "../services/utility";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { getPriceFeed } from '../services/priceFeed';

export function Dashboard () {

  const alchemyWeb3 = createAlchemyWeb3(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`);
  
  const [currUser, setCurrUser] = useState({});
  const [rings, setRings] = useState([]);
  const [hasMarriageCert, setHasMarriageCert] = useState(false);
  const [hasTree, setHasTree] = useState(false);
  const [marriageCertImage, setMarriageCertImage] = useState("");
  const [treeImage, setTreeImage] = useState("");

  const [latestPrice, setLatestPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      setCurrUser(user);
      
      if(user.married) {
        const tokenId = await marriageCertificateTokenId();
        if(!tokenId) { return; }
        const image = await getImageFromMarriageCertTokenId(tokenId);
        setMarriageCertImage(image);
        setHasMarriageCert(true);


        const treeTokenId = await fetchTreeTokenId();
        if(!treeTokenId) { return; }
        const treeimg = await getTreeImageFromTokenId(treeTokenId);
        setTreeImage(treeimg);
        setHasTree(true);

        const maticPrice = await getPriceFeed();
        console.log(maticPrice);
        setLatestPrice(maticPrice);
      }
    }

    const fetchNFTs = async () => {
        // const ringNFTArray = await myRingNFTs();
        // ringNFTArray.forEach(async nft => {
        //     var myNFT = await getMetadataFromTokenId(nft.tokenId);
        //     myNFT.image = uriToImageConverter(myNFT.image);
        //     myNFT.tokenId = nft.tokenId;
        //     setRings((arr) => [...arr, myNFT]);
        //   }
        // );
        const wallet = await loadAccount();

        const alchemyNFTs = await alchemyWeb3.alchemy.getNfts({
          owner: wallet,
          contractAddresses: [process.env.REACT_APP_RINGNFT]
        });
        
        const length = alchemyNFTs.totalCount;
        const alchemyNFTsList = alchemyNFTs.ownedNfts;
        
        setRings([]);
        for(var i = 0; i < length; i++) {
          const nftObject = alchemyNFTsList[i];
          let metadata, image;
          try{
            metadata = await getMetadataFromGeneralContractTokenUri(nftObject.tokenUri.raw);
            image = uriToImageConverter(metadata.image);
          }
          catch (e) {
            continue;
          }
          var myNftObject = {
            "contract": nftObject.contract.address,
            "tokenId": nftObject.id.tokenId,
            "tokenUri": nftObject.tokenUri.raw,
            "name": metadata.name,
            "description": metadata.description,
            "image": image
          }
          setRings((prev) => [...prev, myNftObject]);
        }
    

      };

    fetchData();
    fetchNFTs();
  }, []);

  const mintTreeNFT = async () => {
    const status = await mintTree(currUser.partner);
    if(status) {
      window.alert("Tree NFT minted successfully");
      window.location.reload();
    }
  }


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
              
              {hasMarriageCert &&
              <div>
                <h4 className="card-title">Your Marriage Certificate</h4>
                <Container style={{marginLeft:"calc(50% - 350px)"}}>
                  <img src={marriageCertImage}></img>
                </Container>
              </div>
              }
              {hasMarriageCert && !hasTree &&
              <div className="purchase__detailsBuy">
                <h4 className="card-title">Your Tree NFT</h4>
                <button style={{marginLeft:"calc(50% - 106.4px)"}} onClick={mintTreeNFT}>
                  Claim Your Tree NFT
                </button>
              </div>
              }
              {hasMarriageCert && hasTree &&
              <div>
                <h4 className="card-title">Your Tree NFT</h4>
                  <Container style={{marginLeft:"35%"}}>
                    <img src={treeImage} alt="TREE" className='mb-4'/>
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
                    <Card.Title>#{parseInt(ring.tokenId, 16)} {ring.name}</Card.Title>
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