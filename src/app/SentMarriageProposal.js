import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { Certificate, download } from './certificate.js';
import { loadAccount, getUser, getMarriageProposalById, respondToMarriageProposal } from "./services/web3";
import { GENDER } from './services/constants';

function SendMarriageProposal
(props) {
    const { goBack, push } = useHistory()
    const proposalId = props.match.params.marriageProposalId;

    const [proposalDetails, setProposalDetails] = useState({
        proposalId: "",
        proposeeAddr: "",
        proposeeUser: "",
        proposeeVows: "",
        proposalStatus: "0",
    })
    const [currUser, setCurrUser] = useState({});
    const [yourVows, setYourVows] = useState("");
    const [hasAccepted, setHasAccepted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const currUser = await getUser(); // Current user
            setCurrUser(currUser);

            const proposal = await getMarriageProposalById(proposalId);
            setYourVows(proposal.proposerVows)
            const partner = await getUser(proposal.proposee);
            setProposalDetails(prevData => ({
                ...prevData,
                proposalId: proposal.id,
                proposeeAddr: proposal.proposee,
                proposeeUser: partner,
                proposeeVows: proposal.proposeeVows,
                proposalStatus: proposal.status,
            }));

            if(proposal.status === "1") {
                setHasAccepted(true);
            }
          };

        fetchData();
    },[proposalId]);

    return(
            <div className='purchase'>
                <div className="goback">    
                   <img style={{width:"48px"}} src="/assets/images/wedding-img/icon/left-arrow3.png" onClick={goBack} alt="Go back" className='gobackButton'/>
                </div> 
                <br/><br/><br/>
                <div className="purchase__artwork">
                    <Certificate style={{width:"35vw"}} width='700' height='500' 
                        groom_name={currUser.name} bride_name={proposalDetails.proposeeUser.name}
                        groom_vows={yourVows} bride_vows={proposalDetails.proposeeVows} is_proposal='false'/>
                    <br/>
                    <button className="btn btn-primary" onClick={() => {download();} }><i className="mdi mdi-file-check btn-icon-prepend"></i>Download</button>
                </div>

                <div className="purchase__details">
                    <label>Proposee's Wallet Address:</label>
                    <InputGroup className="mb-3">
                        <FormControl defaultValue={proposalDetails.proposeeAddr} />
                    </InputGroup>
                    <h4>Proposee Name: {proposalDetails.proposeeUser.name}</h4>
                    <h4>Proposee Gender: {GENDER[proposalDetails.proposeeUser.gender]}</h4>
                    <label className="mt-4">Your Vows:</label>
                    <textarea style={{color:"white"}} value={yourVows} 
                        className="form-control" id="note" rows="4" />
                    {
                        hasAccepted && (
                            <div>
                            <label>Partner's vows:</label>
                            <textarea style={{color:"white",background:"#2A3038"}} className="form-control" 
                                id="exampleTextarea1" rows="4" value={proposalDetails.proposeeVows} disabled></textarea>
                            <br/>          
                            </div>
                        )
                    }

                    <div style={{marginTop:"10px"}}className="purchase__detailsBuy">
                        <div>
                            {proposalDetails.proposalStatus === "0" && <button type="button" className="btn btn-lg btn-warning">Waiting</button>}
                            {proposalDetails.proposalStatus === "1" && <button type="button" className="btn btn-lg btn-success">Accepted</button>}
                            {proposalDetails.proposalStatus === "2" && <button type="button" className="btn btn-lg btn-danger">Rejected</button>}
                        </div>
                    </div>
                    
                </div>
            </div> 
    )
}

export default SendMarriageProposal

