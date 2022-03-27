import React, { useEffect, useState, useRef } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import {Certificate, download} from './certificate.js';

function SendEngagementProposal(props) {
    const { goBack } = useHistory()
    const data =   {
        id:"1",
        walletAddress: "0x1231231241",
        name: "Kriti Sanon",
        gender: "Female"
    }
    const [loverDetails, setLoverDetails] = useState(data)
    const[walletAddress, setWalletAddress] = useState("0X121331241241"); 
    const[vows, setVows] = useState(""); 

    function fetchDetails() {
        alert(walletAddress)
        //fetch loved one's details
    }

    const handleVowsChange = (e) => {
        setVows(e.target.value);
    };

    return(
            <div className='purchase'>
                <div className="goback">    
                   <img src="/assets/images/wedding-img/icon/next.png" onClick={goBack} alt="Go back" className='gobackButton'/>
                </div>
                <br/><br/><br/>
                <div className="purchase__artwork">
                    {/* <img src='/assets/images/wedding-img/marriage-certificate-image.png' alt="Marriage Certificate" /> */}
                    <Certificate width='700' height='500' groom_name='G Sri Harsha' bride_name='Sri Harsha G' groom_vows={vows} bride_vows='' is_proposal='true'/>
                </div>

                <div className="purchase__details">
                    <label htmlFor="exampleTextarea1">Your Loved One's Wallet Address:</label>
                    <InputGroup className="mb-3">
                        <FormControl
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={walletAddress}
                        onChange={(e) => {setWalletAddress(e.target.value)}}
                        />
                        <Button variant="primary" id="button-addon2" onClick={fetchDetails}>
                        Fetch Details
                        </Button>
                    </InputGroup>
                    <h3 style={{height:"25px"}}>Name: {data.name}</h3>
                    <h4>Gender: {data.gender}</h4>
                    <label htmlFor="exampleTextarea1">Your Vows:</label>
                    <textarea style={{color:"white"}} className="form-control" id="vows" rows="4" placeholder="Write Your Vows" onChange={handleVowsChange} value={vows}></textarea>
                    <br/>
                    <div style={{marginTop:"10px"}}className="purchase__detailsBuy">
                        <button onClick={() => {alert("Sent Proposal"); goBack()} }>Send Proposal!</button>
                        <button onClick={() => {download();} }><i className="mdi mdi-file-check btn-icon-prepend"></i>Download</button>
                    </div>
                </div>
            </div> 
    )
}

export default SendEngagementProposal
