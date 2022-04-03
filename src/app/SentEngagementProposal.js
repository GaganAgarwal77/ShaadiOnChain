import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import { getEngagementProposalById, getUser } from "./services/web3";
import { getImageFromTokenId, getMetadataFromTokenId } from "./services/utility";
import { GENDER } from './services/constants';

function SentEngagementProposal(props) {
    const { goBack } = useHistory()

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
                   <img style={{width:"48px"}} src="/assets/images/wedding-img/icon/left-arrow3.png" onClick={goBack} alt="Go back" className='gobackButton'/>
                </div> 
                <div> 
                
                </div> 
                {ringDetails.image === "" ? 
                        <div className="purchase__artwork">
                        <img style={{width:"25vw", marginLeft:"10px"}} src={yourRingImage} alt="Ring NFT" />
                        <h4 style={{textAlign:"center", color:"#f2c96a"}}> Ring for your loved one</h4>
                        </div>
                    :
                        <div style={{display:"flex",marginLeft:"10%"}}>
                            <div className="purchase__artwork">
                            <img style={{width:"15vw"}} src={ringDetails.image} alt="Ring NFT" />
                            <h4 style={{textAlign:"center", color:"#f2c96a"}}> Ring for you</h4>
                            <h5>Ring Name: <span style={{color:"#f2c96a"}}>{ringDetails.name}</span></h5>
                            <h5>Ring Description: <span style={{color:"#f2c96a"}}>{ringDetails.description}</span></h5>
                            </div>
                            
                            <div className="purchase__artwork">
                            <img style={{width:"15vw", marginLeft:"10px"}} src={yourRingImage} alt="Ring NFT" />
                            <h4 style={{textAlign:"center", color:"#f2c96a"}}> Ring for your loved one</h4>
                            </div>
                        </div>
                }

                <div className="purchase__details">
                    <h3  style={{fontFamily:"Poppins, serif", color:"#f2c96a"}}>Proposee's Details:</h3>
                    <div className='d-flex' style={{fontWeight:"300"}}>
                    <h4 style={{marginRight:"1rem",fontWeight:"300"}}>Name: <span style={{color:"#f2c96a"}}>{proposalDetails.proposeeUser.name}</span></h4> 
                    <h4 style={{fontWeight:"300"}}>Gender: <span style={{color:"#f2c96a"}}>{GENDER[proposalDetails.proposeeUser.gender]}</span></h4> 

                    </div>
                    <h4 style={{width:"250px", overflow:"hidden", whiteSpace:"nowrap", cursor:"pointer", textOverflow:"ellipsis", fontWeight:"300"}} 
                    onClick={(e) => {navigator.clipboard.writeText(proposalDetails.proposeeAddr); alert("Copied wallet address to clipboard")}}>
                        Wallet Address: <span style={{color:"#f2c96a"}}> {proposalDetails.proposeeAddr} </span></h4>

                    <label className="mt-4">Your Note of Love:</label>
                    <textarea style={{color:"#f2c96a"}} value={yourNote}
                        className="form-control" id="note" rows="4" placeholder="Write a note of love" />

                    <div style={{marginTop:"10px"}}className="purchase__detailsBuy">
                        <div>
                            {proposalDetails.proposalStatus === "0" && <button type="button" className="btn btn-lg btn-warning">Waiting</button>}
                            {proposalDetails.proposalStatus === "1" && <button type="button" className="btn btn-lg btn-success">Accepted</button>}
                            {proposalDetails.proposalStatus === "2" && <button type="button" className="btn btn-lg btn-danger">Rejected</button>}
                        </div>
                    </div>
                    {proposalDetails.proposalStatus === "1" && <div>
                    <label>Recieved Note of Love:</label>
                    <textarea style={{color:"white",background:"#2A3038"}}className="form-control" id="exampleTextarea1" rows="4" value={proposalDetails.proposeeNote} disabled></textarea>
                    </div>
                    }
                    
                </div>
            </div> 
    )
}

export default SentEngagementProposal
