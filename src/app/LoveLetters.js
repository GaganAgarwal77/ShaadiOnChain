import React , { useState, useEffect } from 'react'
import  '../assets/Market.css'
import  '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import { web3, loadAccount, getLoveLetterPrice, purchaseLoveLetter, 
    getLoveLettersForUser, getLoveLetterById, tokenURILoveLetter } from "./services/web3";

const LetterData = [
    {
        tokenID:"1",
        name: "Kriti",
        note: "Note of love",
        type:"Female"
    },
    {
        tokenID:"2",
        name: "Shraddha",
        note: "Note of love",
        type:"Female"
    },
    {
        tokenID:"3",
        name: "Alia",
        note: "Note of love",
        type:"Female"
    },
    {
        tokenID:"4",
        name: "Katrina",
        note: "Note of love",
        type:"Female"
    },
    {
        tokenID:"5",
        name: "Disha",
        note: "Note of love",
        type:"Female"
    },
  
  ]


const getLoveLetterImageFromTokenId = async (tokenId) => {
    var cid = await tokenURILoveLetter(tokenId);
    const image = 'https://' + cid + '.ipfs.dweb.link';
    return image;
}


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
                     <div className="card" style={{margin:"10px",cursor:"pointer"}} onClick={() => push('/love-letter/' + letter.tokenId)}>
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
                {LetterData.map((letter) => (
                     <div className="card" style={{margin:"10px",cursor:"pointer"}} onClick={() => push('/read-love-letter/' + letter.tokenID)}>
                        <div className="card-body">
                            <div className="item">
                                <img style={{width:"100%"}}src='/assets/images/wedding-img/marriage-certificate-image.png' alt="carousel-item" />
                            </div>
                        </div>
                    </div>
                ))
                }
        </div>
        </div>
    )
}

export default LoveLetters
