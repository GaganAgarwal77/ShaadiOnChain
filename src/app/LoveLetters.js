import React , { useState, useEffect } from 'react'
import  '../assets/Market.css'
import  '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import { web3, loadAccount, getLoveLetterPrice, purchaseLoveLetter, 
    getLoveLettersForUser, getLoveLetterById } from "./services/web3";
import { getLoveLetterImageFromTokenId } from "./services/utility";

function LoveLetters() {
    const { push } = useHistory()

    const [letterPrice, setLetterPrice] = useState('');
    const [myLetters, setMyLetters] = useState([]);
    const [rcvdLetters, setRcvdLetters] = useState([]);

    useEffect(() => {

        const fetchPrice = async () => {
            const price = await getLoveLetterPrice();
            setLetterPrice(web3.utils.fromWei(price));
        }

        const fetchMyLetters = async () => {
            const account = await loadAccount();
            const tokenIds = await getLoveLettersForUser();

            let letters = []
            for(var i = 0; i < tokenIds.length; i++) {
                var letter = await getLoveLetterById(tokenIds[i]);
                letter.tokenId = tokenIds[i];
                letters.push(letter);
            }
          
            letters.forEach(async letter => {
                const image = await getLoveLetterImageFromTokenId(letter.tokenId);
                letter.image = image;
                if(letter.creator === account) {
                    setMyLetters((arr) => [...arr, letter]);
                }
                else {
                    setRcvdLetters((arr) => [...arr, letter]);
                }
            })
        };

        fetchPrice();
        fetchMyLetters();
    }, []);

    const purchase = async () => {
        const status = await purchaseLoveLetter();
        if(status) {
            window.alert("Purchase is successfully completed!");
            window.location.reload();
        }
    }

    return (
        <div>
            <div className="purchase__detailsBuy">
                <button onClick={purchase}>
                Purchase Love Letter NFT for {letterPrice} <img src="/assets/images/ethereum3.svg" alt="ETH" width="30" height="30" className='symbol' />
                </button>
            </div>
        <h2 className='mt-3'>Your Love Letters</h2>
        <div className='market'> 
                {myLetters.map((letter) => (
                     <div className="card" style={{width:"20vw",margin:"10px",cursor:"pointer"}} onClick={() => push('/love-letter/' + letter.tokenId)}>
                        <div className="card-body">
                            <div className="item">
                                <img style={{width:"100%"}} src={letter.image} alt="letter" />
                            </div>
                        </div>
                    </div>
                ))
                }
        </div>
        <h2 className='mt-3'>Recieved Love Letters</h2>
        <div className='market'> 
                {rcvdLetters.map((letter) => (
                     <div className="card" style={{width:"20vw",margin:"10px",cursor:"pointer"}} onClick={() => push('/read-love-letter/' + letter.tokenId)}>
                        <div className="card-body">
                            <div className="item">
                                <img style={{width:"100%"}} src={letter.image} alt="letter" />
                            </div>
                        </div>
                    </div>
                ))
                }
        </div>
        </div>
    )
}

export default LoveLetters;