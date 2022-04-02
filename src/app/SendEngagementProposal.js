import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import { getUser, isRingNFTOwner, approveRingtoShaadiContract, createEngagementProposal } from './services/web3';
import { getImageFromTokenId } from "./services/utility";
import { GENDER } from './services/constants';

function SendEngagementProposal(props) {
    const { push, goBack } = useHistory()

    const [loverDetails, setLoverDetails] = useState({})
    const [loverAddr, setLoverAddr] = useState(""); 
    const [ringID, setRingID] = useState(""); 
    const [ringImageUri, setRingImageUri] = useState("/assets/images/engagement_proposal.gif");
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

        const state = await approveRingtoShaadiContract(ringID);
        if(!state) {
            return;
        }
        const image = await getImageFromTokenId(ringID);
        setRingImageUri(image);
    }

    const sendProposal = async () => {
        const status = await createEngagementProposal(loverAddr, ringID, note);
        if(status) {
            window.alert("Engagement Proposal created successfully");
            window.location.href ="/sent-proposals"
        }
    }

    return (
            <div className='purchase'>
                <div className="goback">    
                    <img style={{width:"48px"}} src="/assets/images/wedding-img/icon/left-arrow3.png" onClick={goBack} alt="Go back" className='gobackButton'/>   
                </div> 
                <div> 
                
                </div> 
                <div style={{marginLeft:"10%"}} className="purchase__artwork">
                    <img src={ringImageUri===''? 'https://thumbs.gfycat.com/EqualPowerfulKoodoo-size_restricted.gif': ringImageUri} alt="Ring NFT"/>
                </div>

                <div className="purchase__details">
                    <label htmlFor="exampleTextarea1"  style={{color:"#f2c96a"}} >Your Loved One's Wallet Address:</label>
                    <InputGroup className="mb-3">
                        <FormControl
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={loverAddr}
                            onChange={(e) => {setLoverAddr(e.target.value)}}
                        />
                        <Button variant="primary" id="button-addon2" onClick={fetchUser} >
                            Fetch User
                        </Button>
                    </InputGroup>
                    {
                        Object.keys(loverDetails).length === 0 ? 
                        <div></div> :
                        <React.Fragment>
                        <div className="d-flex">
                            <h4 className='mr-2'> Name: <span style={{color:"#f2c96a"}}>{loverDetails.name}</span></h4>
                            <h4>Gender: <span style={{color:"#f2c96a"}}>{GENDER[loverDetails.gender]}</span></h4>
                        </div>

                        <br/>  
                        <InputGroup className="mt-2 mb-3">
                            <FormControl
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={ringID}
                            placeholder="Your Ring NFT's Token ID"
                            style={{color:"#f2c96a"}}
                            onChange={(e) => {setRingID(e.target.value)}}
                            />
                            <Button variant="primary" id="button-addon2" onClick={fetchRing} style={{background:"linear-gradient(to right, #f09819, #edde5d)", border:"none"}}>
                                Fetch Ring
                            </Button>
                        </InputGroup>
                        <label htmlFor="note">A Note of Love:</label>
                        <textarea style={{color:"#f2c96a"}} value={note} onChange={(e) => {setNote(e.target.value)}}
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
