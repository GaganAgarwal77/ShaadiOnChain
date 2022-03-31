import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import { InputGroup, FormControl } from 'react-bootstrap'
import { NFTStorage } from 'nft.storage'

import { Certificate, download, certificateImage } from './certificate.js';
import { getUser, getMarriageProposalById, respondToMarriageProposal, mintMarriageCertificate } from "./services/web3";
import { GENDER } from './services/constants';
import { dataURItoBlob } from './services/utility';

function AcceptMarriageProposal(props) {
    
    const { goBack, push } = useHistory()
    const proposalId = props.match.params.marriageProposalId;

    const [proposalDetails, setProposalDetails] = useState({
        proposalId: "",
        proposerAddr: "",
        proposerUser: "",
        proposerVows: "",
        proposalStatus: "0",
    })
    const [isDisabled, setIsDisabled] = useState(false);
    const [currUser, setCurrUser] = useState({});
    const [yourVows, setYourVows] = useState(""); 

    useEffect(() => {
        const fetchData = async () => {
            const currUser = await getUser(); // Current user
            setCurrUser(currUser);

            const proposal = await getMarriageProposalById(proposalId);

            const user = await getUser(proposal.proposer);
            setProposalDetails(prevData => ({
                ...prevData,
                proposalId: proposal.id,
                proposerAddr: proposal.proposer,
                proposerUser: user,
                proposerVows: proposal.proposerVows,
                proposalStatus: proposal.status,
            }));

            if(proposal.status === "1") {
                setIsDisabled(true);
                setYourVows(proposal.proposeeVows);
            }
            else if(proposal.status === "2") {
                setIsDisabled(true);
            }

          };

        fetchData();
    },[proposalId]);

    const respondToProposal = async (response) => {
        const status = await respondToMarriageProposal(proposalId, response, yourVows);
        if(status) {
            window.alert("Your response is saved on blockchain successfully");
            push('/dashboard');
        }
    }

    const mint = async () => {
        const imageb64png = certificateImage();
        const image = dataURItoBlob(imageb64png)

        const client = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE })
        const ipfs = { 
            name: "Marriage certificate",
            description: "This is a marriage certificate",
            image: image,
            proposer: proposalDetails.proposerUser.name , 
            proposee: currUser.name,  
        };
        const metadata = await client.store(ipfs);
        window.alert("Successfully stored on IPFS");

        var storageUrl = metadata.url;
        const status = await mintMarriageCertificate(storageUrl, proposalDetails.proposerAddr);
        if(status) {
            window.alert('Minted ring successfully for you and your partner!');
            push('/dashboard');
        }
    }

    return(
            <div className='purchase'>
                <div className="goback">    
                   <img src="/assets/images/wedding-img/icon/next.png" onClick={goBack} alt="Go back" className='gobackButton'/>
                </div> 
                <br/><br/><br/>
                <div className="purchase__artwork">
                    <Certificate style={{width:"35vw"}} width='700' height='500' 
                    groom_name={proposalDetails.proposerUser.name} bride_name={currUser.name}
                    groom_vows={proposalDetails.proposerVows} bride_vows={yourVows} is_proposal='false'/>
                    <br/>
                    <button className="btn btn-primary" onClick={() => {download();} }><i className="mdi mdi-file-check btn-icon-prepend"></i>Download</button>
                </div>

                <div className="purchase__details">
                    <label>Partner's Wallet Address:</label>
                    <InputGroup className="mb-3">
                        <FormControl defaultValue={proposalDetails.proposerAddr}/>
                    </InputGroup>
                    <h4>Partner's Name: {proposalDetails.proposerUser.name}</h4>
                    <h4>Partner's Gender: {GENDER[proposalDetails.proposerUser.gender]}</h4>
                    <label>Recieved Vows:</label>
                    <textarea style={{color:"white",background:"#2A3038"}} className="form-control" id="exampleTextarea1" rows="4" 
                        value={proposalDetails.proposerVows} disabled />
                    <br/>  

                    <label className="mt-4">Your Vows:</label>
                    <textarea style={{color:"white"}} value={yourVows} onChange={(e) => {setYourVows(e.target.value)}}
                        className="form-control" id="note" rows="4" placeholder="Write your vows"/>

                    <div style={{marginTop:"10px"}}className="purchase__detailsBuy">
                        {
                            isDisabled ? 
                            <div>
                                {proposalDetails.proposalStatus === "1" && <button type="button" className="btn btn-success">Accepted</button>}
                                {proposalDetails.proposalStatus === "2" && <button type="button" className="btn btn-danger">Rejected</button>}
                                <div>
                                <button onClick={mint}>Mint Marriage Certificate</button>
                                </div>
                            </div>
                            :
                            <div>
                                <button onClick={() => {respondToProposal(true)}}>Accept Proposal</button>
                                <button onClick={() => {respondToProposal(false)}} 
                                style={{background: "linear-gradient(to right, #ee0979, #ff6a00)"}} >Reject Proposal</button>
                            </div>
                        }
                    </div>
                    
                </div>
            </div> 
    )
}

export default AcceptMarriageProposal;
