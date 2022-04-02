import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import { getEngagementProposalById, getUser, isRingNFTOwner, respondToEngagementProposal, approveRingtoShaadiContract } from "./services/web3";
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

        const state = await approveRingtoShaadiContract(yourRingID);
        if(!state) {
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
            <div className='purchase' >
                <div className="goback">    
                    <img style={{width:"48px"}} src="/assets/images/wedding-img/icon/left-arrow3.png" onClick={goBack} alt="Go back" className='gobackButton'/>
                </div> 
                <div> 
                
                </div> 
                {yourRingImage === "" ? 
                        <div className="purchase__artwork">
                        <img style={{width:"25vw"}} src={ringDetails.image} alt="Ring NFT" />
                        <h4 style={{textAlign:"center",color:"#f2c96a"}}> Ring for you</h4>
                        <h5>Ring Name: <span style={{color:"#f2c96a"}}>{ringDetails.name}</span></h5>
                        <h5>Ring Description: <span style={{color:"#f2c96a"}}>{ringDetails.description}</span></h5>
                        </div>
                    :
                        <div style={{display:"flex",marginLeft:"10%"}}>
                            <div className="purchase__artwork">
                            <img style={{width:"15vw"}} src={ringDetails.image} alt="Ring NFT" />
                            <h4 style={{textAlign:"center", color:"#f2c96a"}}> Ring for you</h4>
                            </div>
                            
                            <div className="purchase__artwork">
                            <img style={{width:"15vw", marginLeft:"10px"}} src={yourRingImage} alt="Ring NFT" />
                            <h4 style={{textAlign:"center", color:"#f2c96a"}}> Ring for your loved one</h4>
                            </div>
                        </div>
                }

                <div className="purchase__details" >

                <h3 style={{fontFamily:"Poppins, serif", color:"#f2c96a"}}>Proposer's Details:</h3>
                    <div className='d-flex' style={{fontWeight:"300"}}>
                    <h4 style={{marginRight:"1rem",fontWeight:"300"}}>Name: <span style={{color:"#f2c96a"}}>{proposalDetails.proposerUser.name}</span></h4> 
                    <h4 style={{fontWeight:"300"}}>Gender: <span style={{color:"#f2c96a"}}>{GENDER[proposalDetails.proposerUser.gender]}</span></h4> 

                    </div>
                    <h4 style={{width:"250px", overflow:"hidden", whiteSpace:"nowrap", cursor:"pointer", textOverflow:"ellipsis", fontWeight:"300"}} 
                    onClick={(e) => {navigator.clipboard.writeText(proposalDetails.proposerAddr); alert("Copied wallet address to clipboard")}}>
                        Wallet Address: <span style={{color:"#f2c96a"}}>{proposalDetails.proposerAddr}</span></h4>

                    <label >Recieved Note of Love:</label>
                    <textarea style={{color:"#f2c96a",background:"#2A3038"}}className="form-control mb-2" id="exampleTextarea1" rows="2" value={proposalDetails.proposerNote} disabled></textarea>
                    <br/>  

                    <InputGroup className="mt-4 mb-2">
                        <FormControl
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={yourRingID}
                        placeholder="Your Ring NFT's Token ID"
                        onChange={(e) => {setYourRingID(e.target.value)}}
                        style={{color:"#f2c96a"}}
                        />
                        <Button variant="primary" id="button-addon2" onClick={fetchRing} style={{background:"linear-gradient(to right, #f09819, #edde5d)", border:"none"}}>
                        Fetch Ring
                        </Button>
                    </InputGroup>
                    <label className="mt-2">Your Note of Love:</label>
                    <textarea style={{color:"#f2c96a"}} value={yourNote} onChange={(e) => {setYourNote(e.target.value)}}
                        className="form-control" id="note" rows="4" placeholder="Write a note of love"/>

                        {
                            isDisabled ? 
                            <div style={{marginTop:"10px"}} className="purchase__detailsBuy">
                                {proposalDetails.proposalStatus === "1" && <button type="button" className="btn btn-success">Accepted</button>}
                                {proposalDetails.proposalStatus === "2" && <button type="button" className="btn btn-danger">Rejected</button>}
                            </div>
                            :
                            <div style={{marginTop:"10px"}} className="purchase__detailsBuy">
                                <button  style={{background: isDisabled ? "" : "radial-gradient( circle 542px at 16.6% 38.6%,  rgba(66,164,14,1) 0%, rgba(86,230,99,1) 100.2% )"}} onClick={() => {respondToProposal(true)}} disabled={isDisabled}>Accept Proposal</button>
                                <button onClick={() => {respondToProposal(false)}} disabled={isDisabled} 
                                style={{background: isDisabled ? "" : "linear-gradient(to right, #ee0979, #ff6a00)"}} >Reject Proposal</button>
                            </div>
                        }
                     
                </div>
            </div>
    )
}

export default SendEngagementProposal
