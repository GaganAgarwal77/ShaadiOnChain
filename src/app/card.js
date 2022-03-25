import React from 'react'
// import '../styles/Card.css';
import '../assets/Card.css'
import { useHistory } from 'react-router-dom'
// import { web3 } from '../services/web3';



function Card({tokenID, name, description, company, price, type}) {
    const { push } = useHistory()

    // var uri = src.slice(7); 
    // uri = uri.substring(0, uri.length - 5);
    // uri = 'https://' + uri + '.ipfs.dweb.link/blob';

    return (
        <div className='card' onClick={() => push('/purchase/' + tokenID)}>
            {/* <img src={"https://ipfs.io/ipfs/" + src.slice(7)} alt="nft artwork" /> */}
            <img src='/assets/images/wedding-img/ring-image.jpg' alt="nft artwork" />
            <div className="card__info">
                <h2>{name}</h2>
                <h4>{description.length >= 100 ? description.substring(0, 100) + '...' : description}</h4>
                <h4>{company}</h4>
                <h4>{type} Ring</h4>
            </div>
            <div className='card__infoValueParent'>
                <div className="card__infoValue">
                        <h3>{price}</h3>
                        <img src="/assets/images/ethereum3.svg" alt="ETH" width="30" height="30" className='symbol' />
                </div>
            </div>
        </div>





        
    )
}

export default Card
