import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'

function Purchase(props) {
    const { goBack } = useHistory()
    const data =   {
        tokenID:"1",
        name: "Ring 1",
        description: "Description of ring",
        company:"Company1",
        price:"1",
        type: "Male"
    }
    return (

            <div className='purchase'>
                <div className="goback">    
                   <img src="/assets/images/wedding-img/icon/next.png" onClick={goBack} alt="Go back" className='gobackButton'/>
                </div> 
                <div> 
                
                </div> 
                <div className="purchase__artwork">
                    <img src='/assets/images/wedding-img/ring-image.jpg' alt="nft artwork" />
                </div>

                <div className="purchase__details">
                    <h1>#{data.tokenID} {data.name}</h1>
                    <h3>{data.description}</h3>
                    <h4>{data.company}</h4>
                    <h4>{data.type} Ring</h4>
                    <div className="purchase__detailsBuy">
                        <div className="value">
                            <h2>{data.price}</h2> 
                            <img src="/assets/images/ethereum3.svg" alt="ETH" width="30" height="30" className='symbol' />
                            
                        </div>
                        <button onClick={() => {console.log("Buy")} }> Buy now</button>
                    </div>
                    
                </div>
            </div> 
    )
}

export default Purchase
