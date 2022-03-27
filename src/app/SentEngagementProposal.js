import React, { useEffect, useState } from 'react'
import '../assets/Purchase.css'
import { useHistory } from 'react-router-dom'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
function SendEngagementProposal(props) {
    const { goBack } = useHistory()
    const data =   {
        id:"1",
        walletAddress: "0x1231231241",
        name: "Kriti Sanon",
        gender: "Female",
        status:"accepted"
    }
    const [loverDetails, setLoverDetails] = useState(data)
    const[ringID, setRingID] = useState("0X5675464563545"); 

    function fetchRing(){
        alert(ringID)
        //fetch ring
    }
    return (

            <div className='purchase'>
                <div className="goback">    
                   <img src="/assets/images/wedding-img/icon/next.png" onClick={goBack} alt="Go back" className='gobackButton'/>
                   
                </div> 
                <div> 
                
                </div> 
                {data.status !== "accepted" && 
                        <div className="purchase__artwork">
                        <img style={{width:"25vw"}} src='/assets/images/wedding-img/ring-image.jpg' alt="nft artwork" />
                        <h4 style={{textAlign:"center"}}> Ring for your loved one</h4>
                        </div>
                } 
                {data.status=="accepted" && 
                    <div  style={{display:"flex",marginLeft:"10%"}}>
                        <div className="purchase__artwork">
                        <img style={{width:"15vw"}}  src={require("../assets/rings/female/7.png")} alt="nft artwork" />
                        <h4 style={{textAlign:"center"}}> Ring for your loved one</h4>
                        </div>
                        
                        <div className="purchase__artwork">
                        <img style={{width:"15vw", marginLeft:"10px"}} src={require("../assets/rings/male/1.png")} alt="nft artwork" />
                        <h4 style={{textAlign:"center"}} >Ring for you</h4>
                        </div>
                    </div>
                }

                <div className="purchase__details">
                    <label htmlFor="exampleTextarea1">Your Loved One's Wallet Address:</label>
                    <InputGroup className="mb-3">
                        <FormControl
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={data.walletAddress}
                        />
                    </InputGroup>
                    <h3 style={{height:"25px"}}>Name: {data.name}</h3>
                    <h4>Gender: {data.gender}</h4>
                    <label htmlFor="exampleTextarea1">Your Note of Love:</label>
                    <textarea style={{color:"white"}} className="form-control" id="exampleTextarea1" rows="4" value="A note of love"></textarea>
                    <br/>  
                    <div style={{marginTop:"10px"}}>
                    {data.status == "accepted" && 
                    <div>
                    <button type="button" className="btn btn-lg btn-success">Accepted</button>
                    <br/>
                    <label className="mt-4" htmlFor="exampleTextarea1">Their Note of Love:</label>
                    <textarea style={{color:"white"}}className="form-control" id="exampleTextarea1" rows="4" value="Their note of love"></textarea>
                    </div>
                    }
                    {data.status == "rejected" && <button type="button" className="btn btn-lg btn-danger">Rejected</button>}
                    {data.status == "waiting" && <button type="button" className="btn btn-lg btn-warning">Waiting</button>}
                    </div>

                    
                </div>
            </div> 
    )
}

export default SendEngagementProposal
