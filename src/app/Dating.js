import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { fetchAllUsers, getUser } from "./services/web3";
import './dashboard/Dashboard.css'
import { GENDER } from './services/constants';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { getMetadataFromGeneralContractTokenUri, uriToImageConverter, getImageFromCID } from "./services/utility";

export function Dating () {

  const alchemyWeb3 = createAlchemyWeb3(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`);

  const [usersList, setUsersList] = useState([]);
  const [fetchedUserAddr, setFetchedUserAddr] = useState("");
  const [fetchedUser, setFetchedUser] = useState({});
  const [isUserFetched, setIsUserFetched] = useState(false)
  const [userAllNFTs, setUserAllNFTs] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetchAllUsers();
      setUsersList(users);
    }

    fetchUsers();
  }, []);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const changeUser = async () => {
    const user = await getUser(fetchedUserAddr);
    setFetchedUser(user);
    setIsUserFetched(true);
    await fetchNFTs(fetchedUserAddr);
  } 

  const handleChangeUserAddr = (idx) => {
    setFetchedUserAddr(usersList[idx]);
  }

  const handleRandomUser = async () => {
    const max = usersList.length;
    const randomIdx = getRandomInt(max);
    const randomUserAddr = usersList[randomIdx];
    await fetchNFTs(randomUserAddr);
    const user = await getUser(randomUserAddr);
    setFetchedUserAddr(randomUserAddr);
    setFetchedUser(user);
    setIsUserFetched(true);
  }

  const fetchNFTs = async (address) => {
    
    const alchemyNFTs = await alchemyWeb3.alchemy.getNfts({
      owner: address
    });
    
    const length = alchemyNFTs.totalCount;
    const alchemyNFTsList = alchemyNFTs.ownedNfts;
    
    setUserAllNFTs([]);
    for(var i = 0; i < length; i++) {
      const nftObject = alchemyNFTsList[i];
      let metadata, image;
      try{
        metadata = await getMetadataFromGeneralContractTokenUri(nftObject.tokenUri.raw);
        image = uriToImageConverter(metadata.image);
      }
      catch (e) {
        try {
          image = getImageFromCID(nftObject.tokenUri.raw);
          metadata = {
            "name": "NFT",
            "description": "This NFT has no description",
          }
        }
        catch (e) {
          continue;
        }
      }
      var myNftObject = {
        "contract": nftObject.contract.address,
        "tokenId": nftObject.id.tokenId,
        "tokenUri": nftObject.tokenUri.raw,
        "metadata": metadata,
        "image": image
      }
      setUserAllNFTs((prev) => [...prev, myNftObject]);
    }
  };

    return (
      <div>
          <h2 style={{color:"#f2c96a"}}>Start Dating Now!</h2>
          <Form.Group className="d-flex" style={{width:"40vw", marginLeft:"calc(50% - 20vw)"}}>
            <Form.Control as="select" size="lg" placeholder="User Wallet Address" 
            onChange={(e) => {handleChangeUserAddr(e.target.value)}} style={{backgroundColor:"#191c24", color:"white"}}>
              <option value="Select a user"> Select a user </option>
              {usersList.map((userAddr, index) => <option value={index}>{userAddr}</option>)}
            </Form.Control>
            <Button variant="primary" id="button-addon2" onClick={changeUser}>
                      Fetch User
            </Button>
          </Form.Group>
          <div className="purchase__detailsBuy">
            <button style={{marginLeft:"calc(50% - 106.4px)", marginBottom:"20px"}} onClick={handleRandomUser}>
                Fetch Random User
            </button>
          </div>
          {isUserFetched && 
        <div className='row'>
          <div className="col-12 grid-margin">
            <div className='card'>
              <div className='card-body'>
                <h2 style={{color:"#f2c96a"}}>User Details</h2>
                <div className='d-flex' style={{fontWeight:"400"}}>
                  <h4 style={{marginRight:"1rem"}}>Name: {fetchedUser.name}</h4> 
                  <h4 style={{marginRight:"1rem"}}>Gender: {GENDER[fetchedUser.gender]}</h4> 
                  <h4 style={{width:"250px", overflow:"hidden", whiteSpace:"nowrap", cursor:"pointer", textOverflow:"ellipsis"}} 
                  onClick={(e) => {navigator.clipboard.writeText(fetchedUser.wallet); alert("Copied wallet address to clipboard")}}>
                    Wallet Address: {fetchedUser.wallet}</h4>

                </div>
                <div className="purchase__detailsBuy mt-3">
                          <button onClick={() => {window.location.href="/love-letters"}}>
                              Send Love Letter
                          </button>
                </div>
                <h4 className="card-title" style={{marginTop:"40px"}}>Their NFTs</h4>
                <Row xs={1} md={2} className="g-4">
                  {userAllNFTs.map((nft, idx) => (
                    <Col style={{marginLeft:"0vw"}}>
                      <Card style={{minWidth:"20vw",maxWidth:"20vw", margin:"10px", borderRadius:"5%", borderColor:"gray", borderStyle:"dashed"}}>
                        <Card.Img variant="top" src={nft.image} style={{width:"90%", marginLeft:"5%", marginTop:"5%", borderRadius:"5%"}}/>
                        <Card.Body>
                          <Card.Title>#{parseInt(nft.tokenId, 16)} {nft.metadata.name}</Card.Title>
                          <Card.Text>
                              {nft.metadata.description}
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
}
      </div> 
    );
  }

export default Dating;