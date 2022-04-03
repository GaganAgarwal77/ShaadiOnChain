import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import { InputGroup, FormControl } from 'react-bootstrap'
import { Certificate, download } from './certificate.js';
import { getUser, createMarriageProposal } from "./services/web3";
import { GENDER } from './services/constants';

function SendEngagementProposal(props) {
    const { goBack } = useHistory()
    
    const [currUser, setCurrUser] = useState({});
    const [partnerDetails, setPartnerDetails] = useState({});
    const [hasPartner, setHasPartner] = useState(false);
    const [vows, setVows] = useState(""); 

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUser(); // Current user
            setCurrUser(user);

            if(user.engaged) {
                const partner = await getUser(user.partner);
                setPartnerDetails(partner);    

                setHasPartner(true); // Should be in the end otherwise certificate does not display names properly
            }
        };

        fetchData();
    },[]);


    const sendProposal = async () => {
        const status = await createMarriageProposal(vows);
        if(status) {
            window.alert("Marriage Proposal created successfully");
            window.location.href ="/sent-proposals"
        }
    }

    return(
            <div className='purchase'>
            {
                hasPartner ? 
                <React.Fragment>
                <div className="goback">    
                    <img style={{width:"48px"}} src="/assets/images/wedding-img/icon/left-arrow3.png" onClick={goBack} alt="Go back" className='gobackButton'/>
                </div>
                <br/><br/><br/>
                <div className="purchase__artwork">
                    <Certificate style={{width:"35vw"}} width='700' height='500' 
                    groom_name={currUser.name} bride_name={partnerDetails.name} groom_vows={vows} bride_vows='' is_proposal='true'/>
                </div>
                <div className="purchase__details">
                    <label>Your Partner's Wallet Address:</label>
                    <InputGroup className="mb-3">
                        <FormControl defaultValue={partnerDetails.wallet}/>
                    </InputGroup>
                    <h4>Partner Name: {partnerDetails.name}</h4>
                    <h4>Partner Gender: {GENDER[partnerDetails.gender]}</h4>
                    <label>Your Vows:</label>
                    <textarea style={{color:"white"}} className="form-control" id="vows" rows="4" placeholder="Write Your Vows" 
                    onChange={(e) => {setVows(e.target.value)}} value={vows}/>
                    <br/>
                    <div style={{marginTop:"10px"}}className="purchase__detailsBuy">
                        <button onClick={sendProposal}>Send Proposal</button>
                        <button onClick={() => {download();} }><i className="mdi mdi-file-check btn-icon-prepend"></i>Download</button>
                    </div>
                </div>
                </React.Fragment>
                :
                <div>Please send a engagemenet proposal first</div>
            }
            </div> 
    )
}

export default SendEngagementProposal
