import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import { InputGroup, FormControl } from 'react-bootstrap'
import { getEngagementProposalById, getUser } from "./services/web3";
import { getImageFromTokenId, getMetadataFromTokenId } from "./services/utility";
import { GENDER } from './services/constants';

function SentEngagementProposal(props) {
    const { goBack, push } = useHistory()

    const proposalId = props.match.params.engagementProposalId;

    const [proposalDetails, setProposalDetails] = useState({
        proposalId: "",
        proposeeAddr: "",
        proposeeUser: "",
        proposeeNote: "",
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

    useEffect(() => {
        const fetchData = async () => {
            const proposal = await getEngagementProposalById(proposalId);

            const proposerImage = await getImageFromTokenId(proposal.proposerRingTokenId);
            setYourRingID(proposal.proposerRingTokenId);
            setYourRingImage(proposerImage);
            setYourNote(proposal.proposerNote);

            if(proposal.status === "1") {
                const metadata = await getMetadataFromTokenId(proposal.proposeeRingTokenId);
                const image = await getImageFromTokenId(proposal.proposeeRingTokenId);
                setRingDetails(prevData => ({
                    ...prevData,
                    tokenId: proposal.proposeeRingTokenId,
                    name: metadata.name,
                    description: metadata.description,
                    ringType: metadata.ringType,
                    image: image
                }))
            }

            const user = await getUser(proposal.proposee);
            setProposalDetails(prevData => ({
                ...prevData,
                proposalId: proposal.id,
                proposeeAddr: proposal.proposee,
                proposeeUser: user,
                proposeeNote: proposal.proposeeNote,
                proposalStatus: proposal.status,
            }));
            
          };

        fetchData();
    },[proposalId]);


    return (
            <div className='purchase'>
                <div className="goback">    
                   <img src="/assets/images/wedding-img/icon/next.png" onClick={goBack} alt="Go back" className='gobackButton'/>
                </div> 
                <div> 
                
                </div> 
                {ringDetails.image === "" ? 
                        <div className="purchase__artwork">
                        <img style={{width:"15vw", marginLeft:"10px"}} src={yourRingImage} alt="Ring NFT" />
                        <h4 style={{textAlign:"center"}} >Ring for your loved one</h4>
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
                    <h4>Proposee's Ring Name: {ringDetails.name}</h4>
                    <label>Proposee's Ring Description:</label>
                    <textarea style={{color:"white",background:"#2A3038"}} className="form-control" 
                    id="ringdesc" rows="4" value={ringDetails.description} disabled />
                    <label>Proposee's Wallet Address:</label>
                    <InputGroup className="mb-3">
                        <FormControl
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        defaultValue={proposalDetails.proposeeAddr}
                        />
                    </InputGroup>
                    <h4>Proposee Name: {proposalDetails.proposeeUser.name}</h4>
                    <h4>Proposee Gender: {GENDER[proposalDetails.proposeeUser.gender]}</h4>
                    <label>Recieved Note of Love:</label>
                    <textarea style={{color:"white",background:"#2A3038"}}className="form-control" id="exampleTextarea1" rows="4" value={proposalDetails.proposeeNote} disabled></textarea>
                    <br/>  

                    <label>Your Ring NFT's Token ID:</label>                    
                    <InputGroup className="mb-3">
                        <FormControl
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={yourRingID}
                        onChange={(e) => {setYourRingID(e.target.value)}}
                        />
                    </InputGroup>
                    <label className="mt-4">Your Note of Love:</label>
                    <textarea style={{color:"white"}} value={yourNote} onChange={(e) => {setYourNote(e.target.value)}}
                        className="form-control" id="note" rows="4" placeholder="Write a note of love"/>

                    <div style={{marginTop:"10px"}}className="purchase__detailsBuy">
                        <div>
                            {proposalDetails.proposalStatus === "0" && <button type="button" className="btn btn-warning">Waiting</button>}
                            {proposalDetails.proposalStatus === "1" && <button type="button" className="btn btn-success">Accepted</button>}
                            {proposalDetails.proposalStatus === "2" && <button type="button" className="btn btn-danger">Rejected</button>}
                        </div>
                    </div>
                    
                </div>
            </div> 
    )
}

export default SentEngagementProposal
