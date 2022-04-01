import React, { useEffect, useState } from 'react'
import Card from './card'
import  '../assets/Market.css'

import { web3, saleRingNFTs } from "./services/web3";
import { getMetadataFromTokenId } from "./services/utility";

function Market() {
    const [rings, setRings] = useState([]);

    useEffect(() => {
        const fetchNFTs = async () => {
            const ringNFTArray = await saleRingNFTs();
            ringNFTArray.forEach(async nft => {
                var newNFT = await getMetadataFromTokenId(nft.tokenId);
                newNFT.itemId = nft.itemId;
                newNFT.tokenId = nft.tokenId;
                newNFT.creator = nft.creator;
                newNFT.owner = nft.owner;
                newNFT.price = nft.price;
                setRings((arr) => [...arr, newNFT]);
              }
            );
        };
        fetchNFTs();
    }, []);


    return (
        <div className='market'> 
            {rings.map((ring) => (
                <Card
                key={ring.itemId}
                itemId={ring.itemId}
                tokenId={ring.tokenId}
                name={ring.name}
                description={ring.description}
                image={ring.image}
                creator={ring.creator}
                owner={ring.owner}
                price={web3.utils.fromWei(ring.price)}
                type={ring.ringType}
                />
            ))
            }
        </div>
    )
}

export default Market
