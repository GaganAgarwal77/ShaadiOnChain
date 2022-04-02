import React , { useState, useEffect } from 'react'
import  '../assets/Market.css'
import  '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import { web3, loadAccount, getLoveLetterPrice, purchaseLoveLetter, 
    getLoveLettersForUser, getLoveLetterById } from "./services/web3";
import { getLoveLetterImageFromTokenId } from "./services/utility";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

/*
https://docs.alchemy.com/alchemy/enhanced-apis/nft-api
*/

function ViewNfts() {
    const { push } = useHistory()

    const [letterPrice, setLetterPrice] = useState('');
    const [myLetters, setMyLetters] = useState([]);
    const [rcvdLetters, setRcvdLetters] = useState([]);
    const web3 = createAlchemyWeb3(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`);

    const getNFTs = async(ownerAddr) => {
        const nfts = await web3.alchemy.getNfts({
            owner: ownerAddr
        });
        console.log(nfts);
        /*
        {
            "NFTs count" : nfts.totalCount,
            "NFTs list" : nfts.ownedNfts,
            "NFT contract address" : nfts[i].contract.address,
            "NFT token ID" : nfts[i].id.tokenId
        }
        */
    };

    const getNFTMetadata = async(contractAddress, tokenId) => {
        const response = await web3.alchemy.getNftMetadata({
            contractAddress: contractAddress,
            tokenId: tokenId
        });
        console.log(response);
        /*
        {
            "NFT name" : response.title,
            "Token type" : response.id.tokenMetadata.tokenType,
            "Token Uri" : response.tokenUri.gateway,
            "Image Url" : response.metadata.image,
            "Time last updated" : response.timeLastUpdated
        }
        */
    }

    useEffect(() => {
        getNFTs('0xC33881b8FD07d71098b440fA8A3797886D831061');
        getNFTMetadata('0x5180db8F5c931aaE63c74266b211F580155ecac8', '1590');
    }, []);

    return (
        <div>
        <h2 className='mt-3'>Your NFTs</h2>
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
        </div>
    )
}

export default ViewNfts;