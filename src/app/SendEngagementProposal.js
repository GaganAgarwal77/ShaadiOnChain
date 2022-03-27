import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import { getUser, isRingNFTOwner, createEngagementProposal } from './services/web3';
import { getImageFromTokenId } from "./services/utility";
import { GENDER } from './services/constants';

function SendEngagementProposal(props) {
    const { push, goBack } = useHistory()

    const [loverDetails, setLoverDetails] = useState({})
    const [loverAddr, setLoverAddr] = useState(""); 
    const [ringID, setRingID] = useState(""); 
    const [ringImageUri, setRingImageUri] = useState("");
    const [note, setNote] = useState("");
    
    const fetchUser = async () => {
        const user = await getUser(loverAddr);
        setLoverDetails(user);
    }

    const fetchRing = async () => {
        const isOwner = await isRingNFTOwner(ringID);

        if(!isOwner) {
            alert('Given Ring Token Id is not owned by this wallet address');
            return;
        }

        const image = getImageFromTokenId(ringID);
        setRingImageUri(image);
    }

    const sendProposal = async () => {
        const status = await createEngagementProposal(loverAddr, ringID, note);
        if(status) {
            window.alert("Engagement Proposal created successfully");
            push('/dashboard');
        }
    }

    return (
            <div className='purchase'>
                <div className="goback">    
                   <img src="/assets/images/wedding-img/icon/next.png" onClick={goBack} alt="Go back" className='gobackButton'/>   
                </div> 
                <div> 
                
                </div> 
                <div className="purchase__artwork">
                    <img src={ringImageUri===''? 'https://thumbs.gfycat.com/EqualPowerfulKoodoo-size_restricted.gif': ringImageUri} alt="Ring NFT"/>
                </div>

                <div className="purchase__details">
                    <label htmlFor="exampleTextarea1">Your Loved One's Wallet Address:</label>
                    <InputGroup className="mb-3">
                        <FormControl
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={loverAddr}
                            onChange={(e) => {setLoverAddr(e.target.value)}}
                        />
                        <Button variant="primary" id="button-addon2" onClick={fetchUser}>
                            Fetch User
                        </Button>
                    </InputGroup>
                    {
                        Object.keys(loverDetails).length === 0 ? 
                        <div></div> :
                        <React.Fragment>
                        <h4>Name: {loverDetails.name}</h4>
                        <h4>Gender: {GENDER[loverDetails.gender]}</h4>
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
                        <label htmlFor="note">A Note of Love:</label>
                        <textarea style={{color:"white"}} value={note} onChange={(e) => {setNote(e.target.value)}}
                        className="form-control" id="note" rows="4" placeholder="Write a note of love"/>

                        <div style={{marginTop:"10px"}}className="purchase__detailsBuy">
                            <button onClick={() => {sendProposal()} }>Send Proposal</button>
                        </div>
                        </React.Fragment>
                    }                    
                </div>
            </div> 
    )
}

export default SendEngagementProposal
