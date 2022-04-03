import React, { useEffect, useState } from 'react'
import '../assets/Card.css'
import { useHistory } from 'react-router-dom'
import { getUser } from './services/web3';
import { uriToImageConverter } from "./services/utility";


function Card({itemId, tokenId, name, description, image, creator, owner, price, type}) {
    const { push } = useHistory()

    const [creatorName, setCreatorName] = useState('');
    const [imageUri, setImageUri] = useState('');

    useEffect(() => {
        const fetchCreator = async () => {
            const user = await getUser(creator);
            setCreatorName(user.name);
        }

        fetchCreator();
        const uri = uriToImageConverter(image);
        setImageUri(uri);
    }, []);

    return (
        <div className='newcard' onClick={() => push('/purchase/' + itemId)}>
            <img src={imageUri} alt="Ring NFT" />
            {/* <img src='/assets/images/wedding-img/ring-image.jpg' alt="nft artwork" /> */}
            <div className="newcard__info">
                <h2>{name}</h2>
                <h4>{description.length >= 100 ? description.substring(0, 100) + '...' : description}</h4>
                <h4>Creator: {creatorName}</h4>
            </div>
            <div className='newcard__infoValueParent'>
                <div className="newcard__infoValue">
                        <h4 >{type} Ring</h4>
                        <h3>{price}</h3>
                        <img src="/assets/images/ethereum3.svg" alt="ETH" width="30" height="30" className='symbol' />
                </div>
            </div>
        </div>





        
    )
}

export default Card
