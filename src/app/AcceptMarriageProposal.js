import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'

function SendMarriageProposal
(props) {
    const { goBack } = useHistory()
    const data =   {
        id:"1",
        imageURL:'/assets/images/wedding-img/marriage-certificate-image.png',
        spouseName: "Kriti Sanon",
        walletAddress: "0x1231231241",
        type: "Female"
    }
    return (

            <div className='purchase'>
                <div className="goback">    
                   <img src="/assets/images/wedding-img/icon/next.png" onClick={goBack} alt="Go back" className='gobackButton'/>
                </div> 
                <div> 
                
                </div> 
                <div className="purchase__artwork">
                    <img style={{width:"30vw"}}src={data.imageURL} alt="couple photo" />
                    <h4>Marriage Certificate</h4>
                </div>

                <div className="purchase__details">
                    {/* <h1>#{data.tokenID} {data.name}</h1> */}
                    <h3 style={{height:"75px"}}>Name: {data.spouseName}</h3>
                    <h4>Wallet Address: {data.walletAddress}</h4>
                    <h4>Gender: {data.type}</h4>
                    <label htmlFor="exampleTextarea1">Your Vows:</label>
                    <textarea style={{color:"white"}}className="form-control" id="exampleTextarea1" rows="4" placeholder="Write Your Vows"></textarea>
                    <br/>   
                    <div style={{marginTop:"10px"}}className="purchase__detailsBuy">
                        {/* <div className="value">
                            <h2>{data.price}</h2> 
                            <img src="/assets/images/ethereum3.svg" alt="ETH" width="30" height="30" className='symbol' />
                            
                        </div> */}
                        <button onClick={() => {alert("Accepted Proposal"); goBack()} }>Accept Proposal!</button>
                    </div>
                    
                </div>
            </div> 
    )
}

export default SendMarriageProposal

