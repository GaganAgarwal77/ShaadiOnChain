import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
function SendEngagementProposal(props) {
    const { goBack } = useHistory()
    const data =   {
        id:"1",
        walletAddress: "0x1231231241",
        name: "Kriti Sanon",
        gender: "Female"
    }
    const [loverDetails, setLoverDetails] = useState(data)
    const[ringID, setRingID] = useState("0X5675464563545"); 

    function fetchRing(){
        alert(ringID)
        //fetch ring
    }
    return (

            <div className='purchase'>
                <div className="goback">    
                   <img src="/assets/images/wedding-img/icon/next.png" onClick={goBack} alt="Go back" className='gobackButton'/>
                   
                </div> 
                <div> 
                
                </div> 
                <div className="purchase__artwork">
                    <img src='/assets/images/wedding-img/ring-image.jpg' alt="nft artwork" />
                </div>

                <div className="purchase__details">
                    <label htmlFor="exampleTextarea1">Your Loved One's Wallet Address:</label>
                    <InputGroup className="mb-3">
                        <FormControl
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={data.walletAddress}
                        />
                    </InputGroup>
                    <h3 style={{height:"25px"}}>Name: {data.name}</h3>
                    <h4>Gender: {data.gender}</h4>
                    <label htmlFor="exampleTextarea1">A Note of Love:</label>
                    <textarea style={{color:"white"}}className="form-control" id="exampleTextarea1" rows="4" placeholder="Write a note of love"></textarea>
                    <br/>  
                    <label htmlFor="exampleTextarea1">Your Ring NFT's Token ID:</label>
                    
                    <InputGroup className="mb-3">
                        <FormControl
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={ringID}
                        onChange={(e) => {setRingID(e.target.value)}}
                        />
                        <Button variant="primary" id="button-addon2" onClick={fetchRing}>
                        Fetch Ring
                        </Button>
                    </InputGroup>
                    <div style={{marginTop:"10px"}}className="purchase__detailsBuy">
                        <button onClick={() => {alert("Accept Proposal"); goBack()} }>Accept Proposal!</button>
                        <button style={{background:"linear-gradient(to right, #ee0979, #ff6a00)"}} onClick={() => {alert("Reject Proposal"); goBack()} }>Reject Proposal!</button>
                    </div>
                    
                </div>
            </div> 
    )
}

export default SendEngagementProposal
