import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import { web3, getUser, getRingItem, purchaseRing } from "./services/web3";
import { getImageFromTokenId, getMetadataFromTokenId } from "./services/utility";

function Purchase(props) {
    const { goBack, push } = useHistory()

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

    useEffect(() => {
        const fetchData = async () => {
            var RingDetails = await getRingItem(itemID);

            const metadata = await getMetadataFromTokenId(RingDetails.tokenId);
            const image = await getImageFromTokenId(RingDetails.tokenId);
            const user = await getUser(RingDetails.creator);

            setData(prevData => ({
                ...prevData,
                itemId: RingDetails.itemId,
                tokenId: RingDetails.tokenId,
                name: metadata.name,
                description: metadata.description,
                image: image,
                creator: RingDetails.creator,
                owner: RingDetails.owner,
                price: RingDetails.price,
                ringType: metadata.ringType,
                creatorName: user.name,
            }));
          };

        fetchData();
    },[itemID]);

    const purchase = async (event) => {
        const status = await purchaseRing(data.itemId, data.price);
        if(status) {
            window.alert("Purchase is successfully completed!");
            window.location.href ="/dashboard"
        }
    }


    return (
            <div className='purchase'>
                <div className="goback">    
                   <img style={{width:"48px"}} src="/assets/images/wedding-img/icon/left-arrow3.png" onClick={goBack} alt="Go back" className='gobackButton'/>   
                </div> 
                <div> 
                
                </div> 
                <div className="purchase__artwork">
                    <img src={data.image} alt="Ring NFT" />
                </div>

                <div className="purchase__details">
                    <h1>#{data.tokenId} {data.name}</h1>
                    <h3>{data.description}</h3>
                    <h4>Creator: {data.creatorName}</h4>
                    <h4>Current Owner: {data.owner.slice(0,10)}...</h4>
                    <h4>{data.ringType} Ring</h4>
                    <div className="purchase__detailsBuy">
                        <div className="value">
                            <h2>{web3.utils.fromWei(data.price)}</h2> 
                            <img src="/assets/images/ethereum3.svg" alt="ETH" width="30" height="30" className='symbol' />
                        </div>
                        <button onClick={purchase}> Buy now</button>
                    </div>
                    
                </div>
            </div> 
    )
}

export default Purchase
