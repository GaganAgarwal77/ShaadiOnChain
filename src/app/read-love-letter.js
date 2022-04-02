import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import { getUser, getLoveLetterById, writeMessage, sendLoveLetter } from "./services/web3";
import { getLoveLetterImageFromTokenId } from "./services/utility";
import { GENDER } from './services/constants';

function ReadLoveLetter(props) {
    const { goBack } = useHistory()

    const tokenId = props.match.params.tokenId;

    const [loveLetter, setLoveLetter] = useState({});
    const [message, setMessage] = useState("")
    const [loverDetails, setLoverDetails] = useState({})
    const [loverAddr, setLoverAddr] = useState(""); 

    useEffect(() => {
        const fetchMyLetter = async () => {
            var letter = await getLoveLetterById(tokenId);
            letter.tokenId = tokenId;
            const image = await getLoveLetterImageFromTokenId(tokenId);
            letter.image = image;

            const user = await getUser(letter.creator);

            setLoverAddr(letter.creator);
            setLoverDetails(user);
            setLoveLetter(letter);
            setMessage(letter.message);
        };

        fetchMyLetter();
    },[tokenId]);
    

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
                <label>Your Loved One's Wallet Address:</label>
                    <InputGroup className="mb-3">
                        <FormControl
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            defaultValue={loverAddr}
                        />
                    </InputGroup>
                    <h4>Name: {loverDetails.name}</h4>
                    <h4>Gender: {GENDER[loverDetails.gender]}</h4>
                    <div>
                        <label>Love letter message:</label>
                        <textarea style={{color:"white"}} className="form-control" id="exampleTextarea1" rows="4" value={message}></textarea>
                    </div>

                </div>
            </div> 
    )
}

export default ReadLoveLetter
