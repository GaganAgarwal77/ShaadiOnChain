import React, { useEffect, useState } from 'react'
// import '../styles/Card.css';
import '../assets/Card.css'
import { useHistory } from 'react-router-dom'
import { getUser } from './services/web3';



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

        var uri = image.slice(7); 
        uri = uri.substring(0, uri.length - 5);
        uri = 'https://' + uri + '.ipfs.dweb.link/blob';
        setImageUri(uri);
    }, []);

    return (
        <div className='card' onClick={() => push('/purchase/' + tokenId)}>
            <img src={imageUri} alt="nft artwork" />
            {/* <img src='/assets/images/wedding-img/ring-image.jpg' alt="nft artwork" /> */}
            <div className="card__info">
                <h2>{name}</h2>
                <h4>{description.length >= 100 ? description.substring(0, 100) + '...' : description}</h4>
                <h4>Creator: {creatorName}</h4>
            </div>
            <div className='card__infoValueParent'>
                <div className="card__infoValue">
                        <h4 >{type} Ring</h4>
                        <h3>{price}</h3>
                        <img src="/assets/images/ethereum3.svg" alt="ETH" width="30" height="30" className='symbol' />
                </div>
            </div>
        </div>





        
    )
}

export default Card
