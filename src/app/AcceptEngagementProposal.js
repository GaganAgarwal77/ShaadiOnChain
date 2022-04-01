import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import { getEngagementProposalById, getUser, isRingNFTOwner, respondToEngagementProposal } from "./services/web3";
import { getImageFromTokenId, getMetadataFromTokenId } from "./services/utility";
import { GENDER } from './services/constants';

function SendEngagementProposal(props) {
    const { goBack, push } = useHistory()

    const proposalId = props.match.params.engagementProposalId;

    const [proposalDetails, setProposalDetails] = useState({
        proposalId: "",
        proposerAddr: "",
        proposerUser: "",
        proposerNote: "",
        proposalStatus: "0",
    })
    const [ringDetails, setRingDetails] = useState({
        tokenId: "",
        name: "",
        description: "",
        ringType: "",
        image: ""
    })
    const [yourRingID, setYourRingID] = useState("");
    const [yourRingImage, setYourRingImage] = useState("");
    const [yourNote, setYourNote] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const proposal = await getEngagementProposalById(proposalId);

            const metadata = await getMetadataFromTokenId(proposal.proposerRingTokenId);
            const image = await getImageFromTokenId(proposal.proposerRingTokenId);
            setRingDetails(prevData => ({
                ...prevData,
                tokenId: proposal.proposerRingTokenId,
                name: metadata.name,
                description: metadata.description,
                ringType: metadata.ringType,
                image: image
            }))

            const user = await getUser(proposal.proposer);
            setProposalDetails(prevData => ({
                ...prevData,
                proposalId: proposal.id,
                proposerAddr: proposal.proposer,
                proposerUser: user,
                proposerNote: proposal.proposerNote,
                proposalStatus: proposal.status,
            }));

            if(proposal.status === "1") {
                setIsDisabled(true);
                const proposeeImage = await getImageFromTokenId(proposal.proposeeRingTokenId);
                setYourRingID(proposal.proposeeRingTokenId);
                setYourRingImage(proposeeImage);
                setYourNote(proposal.proposeeNote);
            }
            else if(proposal.status === "2") {
                setIsDisabled(true);
            }
          };

        fetchData();
    },[proposalId]);

    const fetchRing = async () => {
        const isOwner = await isRingNFTOwner(yourRingID);

        if(!isOwner) {
            alert('Given Ring Token Id is not owned by this wallet address');
            return;
        }

        const image = await getImageFromTokenId(yourRingID);
        console.log(image)
        setYourRingImage(image);
    }

    const respondToProposal = async (response) => {
        const status = await respondToEngagementProposal(proposalId, response, yourRingID, yourNote);
        if(status) {
            window.alert("Your response is saved on blockchain successfully");
            window.location.href ="/dashboard"
        }
    }

    return (
            <div className='purchase'>
                <div className="goback">    
                   <img src="/assets/images/wedding-img/icon/next.png" onClick={goBack} alt="Go back" className='gobackButton'/>
                </div> 
                <div> 
                
                </div> 
                {yourRingImage === "" ? 
                        <div className="purchase__artwork">
                        <img style={{width:"25vw"}} src={ringDetails.image} alt="Ring NFT" />
                        <h4 style={{textAlign:"center"}}> Ring for you</h4>
                        </div>
                    :
                        <div style={{display:"flex",marginLeft:"10%"}}>
                            <div className="purchase__artwork">
                            <img style={{width:"15vw"}} src={ringDetails.image} alt="Ring NFT" />
                            <h4 style={{textAlign:"center"}}> Ring for you</h4>
                            </div>
                            
                            <div className="purchase__artwork">
                            <img style={{width:"15vw", marginLeft:"10px"}} src={yourRingImage} alt="Ring NFT" />
                            <h4 style={{textAlign:"center"}} >Ring for your loved one</h4>
                            </div>
                        </div>
                }

                <div className="purchase__details">
                    <h4>Proposer's Ring Name: {ringDetails.name}</h4>
                    <label>Proposer's Ring Description:</label>
                    <textarea style={{color:"white",background:"#2A3038"}} className="form-control" 
                    id="ringdesc" rows="4" value={ringDetails.description} disabled />
                    <label>Proposer's Wallet Address:</label>
                    <InputGroup className="mb-3">
                        <FormControl
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        defaultValue={proposalDetails.proposerAddr}
                        />
                    </InputGroup>
                    <h4>Proposer Name: {proposalDetails.proposerUser.name}</h4>
                    <h4>Proposer Gender: {GENDER[proposalDetails.proposerUser.gender]}</h4>
                    <label>Recieved Note of Love:</label>
                    <textarea style={{color:"white",background:"#2A3038"}}className="form-control" id="exampleTextarea1" rows="4" value={proposalDetails.proposerNote} disabled></textarea>
                    <br/>  

                    <label>Your Ring NFT's Token ID:</label>                    
                    <InputGroup className="mb-3">
                        <FormControl
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={yourRingID}
                        onChange={(e) => {setYourRingID(e.target.value)}}
                        />
                        <Button variant="primary" id="button-addon2" onClick={fetchRing}>
                        Fetch Ring
                        </Button>
                    </InputGroup>
                    <label className="mt-4">Your Note of Love:</label>
                    <textarea style={{color:"white"}} value={yourNote} onChange={(e) => {setYourNote(e.target.value)}}
                        className="form-control" id="note" rows="4" placeholder="Write a note of love"/>

                    <div style={{marginTop:"10px"}}className="purchase__detailsBuy">
                        {
                            isDisabled ? 
                            <div>
                                {proposalDetails.proposalStatus === "1" && <button type="button" className="btn btn-success">Accepted</button>}
                                {proposalDetails.proposalStatus === "2" && <button type="button" className="btn btn-danger">Rejected</button>}
                            </div>
                            :
                            <div>
                                <button onClick={() => {respondToProposal(true)}} disabled={isDisabled}>Accept Proposal</button>
                                <button onClick={() => {respondToProposal(false)}} disabled={isDisabled} 
                                style={{background: isDisabled ? "" : "linear-gradient(to right, #ee0979, #ff6a00)"}} >Reject Proposal</button>
                            </div>
                        }
                    </div>
                    
                </div>
            </div> 
    )
}

export default SendEngagementProposal
