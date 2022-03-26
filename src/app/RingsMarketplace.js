import React, { useEffect, useState } from 'react'
import Card from './card'
import  '../assets/Market.css'

import axios from 'axios';
import { web3, saleRingNFTs, tokenURI } from "./services/web3";

const RingData = [
  {
    itemId: "1",
    tokenId: "4",
    name: "Best",
    description: "best",
    image: "ipfs://bafybeihm6xznu3ehmq57kfglefxx7kjmk4eh2cya257jqkqm65qre5epjq/blob",
    creator: "0x4CD5Ce92849A4cfcB9D1791C0d8EC7ea10Fe9769",
    owner: "0x4CD5Ce92849A4cfcB9D1791C0d8EC7ea10Fe9769",
    price: "50000000000000000",
    ringType: "Male",
  },
  {
    itemId: "2",
    tokenId: "5",
    name: "Best",
    description: "best",
    image: "ipfs://bafybeihm6xznu3ehmq57kfglefxx7kjmk4eh2cya257jqkqm65qre5epjq/blob",
    creator: "0x4CD5Ce92849A4cfcB9D1791C0d8EC7ea10Fe9769",
    owner: "0x4CD5Ce92849A4cfcB9D1791C0d8EC7ea10Fe9769",
    price: "50000000000000000",
    ringType: "Male",
  },
]

function Market() {

    const getURI = async (i) => {
        var uri = await tokenURI(i);
        uri = uri.slice(7); 
        uri = uri.substring(0, uri.length - 14);
        uri = 'https://' + uri + '.ipfs.dweb.link/metadata.json';
        return uri
      }  

    const [rings, setRings] = useState([]);

    useEffect(() => {
        const fetchNFTs = async () => {
            const ringNFTArray = await saleRingNFTs();
            ringNFTArray.forEach(async nft => {
                var uri = await getURI(nft.tokenId);

                await axios.get(uri).then(result => {
                  var finalNFT = result.data;
                  finalNFT.tokenId = nft.tokenId;
                  finalNFT.owner = nft.owner;
                  finalNFT.creator = nft.creator;
                  finalNFT.itemId = nft.itemId;
                  finalNFT.price = nft.price;
                  setRings((arr) => [...arr, finalNFT]);
                }).catch(error => { console.log(error); })
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
