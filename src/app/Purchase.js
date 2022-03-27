import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios';

import { web3, tokenURI, getUser, getRingItem } from "./services/web3";

function Purchase(props) {
    const { goBack } = useHistory()

    const itemID = props.match.params.itemId;

    const [data, setData] = useState({
        itemId: "",
        tokenId: "",
        name: "",
        description: "",
        image: "",
        creator: "",
        owner: "",
        price: "",
        ringType: "",
        creatorName: "",
    });

    const getURI = async (i) => {
        var uri = await tokenURI(i);
        uri = uri.slice(7); 
        uri = uri.substring(0, uri.length - 14);
        uri = 'https://' + uri + '.ipfs.dweb.link/metadata.json';
        return uri
      }  
  

    useEffect(() => {
        const fetchData = async () => {
            var RingDetails = await getRingItem(itemID);

            var uri = await getURI(RingDetails.tokenId);

            var result = await axios(uri);
            result = result.data;    

            var image = result.image.slice(7); 
            image = image.substring(0, uri.length - 5);
            image = 'https://' + image + '.ipfs.dweb.link/blob';
    

            const user = await getUser(RingDetails.creator);

            setData(prevData => ({
                ...prevData,
                itemId: RingDetails.itemId,
                tokenId: RingDetails.tokenId,
                name: result.name,
                description: result.description,
                image: image,
                creator: RingDetails.creator,
                owner: RingDetails.owner,
                price: RingDetails.price,
                ringType: result.ringType,
                creatorName: user.name,
            }));
          };

        fetchData();
    },[itemID]);



    return (
            <div className='purchase'>
                <div className="goback">    
                   <img src="/assets/images/wedding-img/icon/next.png" onClick={goBack} alt="Go back" className='gobackButton'/>
                </div> 
                <div> 
                
                </div> 
                <div className="purchase__artwork">
                    {/* <img src='/assets/images/wedding-img/ring-image.jpg' alt="nft artwork" /> */}
                    <img src={data.image} alt="nft artwork" />
                </div>

                <div className="purchase__details">
                    <h1>#{data.tokenId} {data.name}</h1>
                    <h3>{data.description}</h3>
                    <h4>Creator: {data.creatorName}</h4>
                    <h4>{data.ringType} Ring</h4>
                    <div className="purchase__detailsBuy">
                        <div className="value">
                            <h2>{web3.utils.fromWei(data.price)}</h2> 
                            <img src="/assets/images/ethereum3.svg" alt="ETH" width="30" height="30" className='symbol' />
                            
                        </div>
                        <button onClick={() => {console.log("Buy")} }> Buy now</button>
                    </div>
                    
                </div>
            </div> 
    )
}

export default Purchase
