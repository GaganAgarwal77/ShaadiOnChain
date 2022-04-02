import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { fetchAllUsers, getUser } from "./services/web3";
import './dashboard/Dashboard.css'
import { GENDER } from './services/constants';

export function Dating () {

  const [isUserFetched, setIsUserFetched] = useState(false)
  const userData = {
    walletAddres:"0xD6e2143D7CDcAfBe9B29073e429b4a251395369E",
    name:"Kriti Sanon",
    gender:"Female"
  }

  const [usersList, setUsersList] = useState([]);
  const [fetchedUserAddr, setFetchedUserAddr] = useState("");
  const [fetchedUser, setFetchedUser] = useState({});

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
  } 

  const handleChangeUserAddr = (idx) => {
    setFetchedUserAddr(usersList[idx]);
  }

  const handleRandomUser = async () => {
    const max = usersList.length;
    const randomIdx = getRandomInt(max);
    console.log(randomIdx);
    const randomUserAddr = usersList[randomIdx];
    const user = await getUser(randomUserAddr);
    setFetchedUserAddr(randomUserAddr);
    setFetchedUser(user);
    setIsUserFetched(true);
  }

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
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <Col style={{marginLeft:"0vw"}}>
                      <Card style={{minWidth:"20vw",maxWidth:"20vw", margin:"10px", borderRadius:"5%", borderColor:"gray", borderStyle:"dashed"}}>
                        <Card.Img variant="top" src={require("../assets/rings/male/"+(idx+1)+  ".png")} style={{width:"90%", marginLeft:"5%", marginTop:"5%", borderRadius:"5%"}}/>
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
}
      </div> 
    );
  }

export default Dating;