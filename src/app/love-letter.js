import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import { getUser, getLoveLetterById, writeMessage, sendLoveLetter } from "./services/web3";
import { getLoveLetterImageFromTokenId } from "./services/utility";
import { GENDER } from './services/constants';

function LoveLetter(props) {
    const { goBack } = useHistory()

    const tokenId = props.match.params.tokenId;

    const [loveLetter, setLoveLetter] = useState({});
    const [isEmpty, setIsEmpty] = useState(true);
    const [message, setMessage] = useState("")
    const [loverDetails, setLoverDetails] = useState({})
    const [loverAddr, setLoverAddr] = useState(""); 

    useEffect(() => {
        const fetchMyLetter = async () => {
            var letter = await getLoveLetterById(tokenId);
            letter.tokenId = tokenId;
            const image = await getLoveLetterImageFromTokenId(tokenId);
            letter.image = image;
            if(letter.message === "") { setIsEmpty(true) }
            else { setIsEmpty(false) }
            setLoveLetter(letter);
            setMessage(letter.message);
        };

        fetchMyLetter();
    },[tokenId]);
    
    const fetchUser = async () => {
        const user = await getUser(loverAddr);
        setLoverDetails(user);
    }

    const writeOnLetter = async () => {
        const status = await writeMessage(tokenId, message);
        if(status) {
            window.alert("Message is written successfully");
            window.location.reload();
        }
    }
    
    const sendLetter = async () => {
        const status = await sendLoveLetter(tokenId, loverAddr);
        if(status) {
            window.alert("Love letter sent successfully");
            window.location.href ="/dashboard"
        }
    }

    return (

            <div className='purchase'>
                <div className="goback">    
                   <img style={{width:"48px"}} src="/assets/images/wedding-img/icon/left-arrow3.png" onClick={goBack} alt="Go back" className='gobackButton'/>   
                </div> 
                <div> 
                
                </div> 
                <div className="purchase__artwork">
                    <img style={{width:"20vw"}} src={loveLetter.image} alt="Love Letter" />
                </div>

                <div className="purchase__details">
                    <label>Love letter message:</label>
                    { 
                        isEmpty ?
                        <div>
                        <textarea style={{color:"white"}} value={message} onChange={(e) => {setMessage(e.target.value)}}
                        className="form-control" id="note" rows="4" placeholder="Write a note of love"/>
                        <Button variant="primary" id="button-addon2" onClick={writeOnLetter}>
                            Write onto letter
                        </Button>    
                        </div>
                        :
                        <div>
                            <textarea style={{color:"white"}} className="form-control" id="exampleTextarea1" rows="4" value={message}></textarea>
                        </div>
                    }
                    <br/>

                    <label>Your Loved One's Wallet Address:</label>
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

                        <div style={{marginTop:"10px"}}className="purchase__detailsBuy">
                            <button onClick={() => {sendLetter()} }>Send Letter</button>
                        </div>
                        </React.Fragment>
                    }                    
                </div>
            </div> 
    )
}

export default LoveLetter
