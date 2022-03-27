import React , {useEffect} from 'react'
import Card from './card'
import  '../assets/Market.css'
import { useHistory } from 'react-router-dom'

const RingData = [
    {
        tokenID:"1",
        name: "Kriti",
        note: "Note of love",
        ringDescription:"Gold Ring",
        type:"Female",
        status:"accepted"
    },
    {
        tokenID:"2",
        name: "Shraddha",
        note: "Note of love",
        ringDescription:"Gold Ring",
        type:"Female",
        status:"accepted"
    },
    {
        tokenID:"3",
        name: "Alia",
        note: "Note of love",
        ringDescription:"Gold Ring",
        type:"Female",
        status:"waiting"
    },
    {
        tokenID:"4",
        name: "Katrina",
        note: "Note of love",
        ringDescription:"Gold Ring",
        type:"Female",
        status:"rejected"
    },
    {
        tokenID:"5",
        name: "Disha",
        note: "Note of love",
        ringDescription:"Gold Ring",
        type:"Female",
        status:"waiting"
    },
  
  ]

  const MarriageData = [
    {
        tokenID:"1",
        name: "Kriti",
        vows: "Vows",
        type:"Female",
        status:"accepted"
    },
    {
        tokenID:"2",
        name: "Shraddha",
        vows: "Vows",
        type:"Female",
        status:"waiting"
    },
    {
        tokenID:"3",
        name: "Alia",
        vows: "Vows",
        type:"Female",
        status:"rejected"
    },
    {
        tokenID:"4",
        name: "Katrina",
        vows: "Vows",
        type:"Female",
        status:"waiting"
    },
    {
        tokenID:"5",
        name: "Disha",
        vows: "Vows",
        type:"Female",
        status:"rejected"
    },
  
  ]


function Market() {
    useEffect(() => {
        console.log(RingData,MarriageData)
    },[RingData,MarriageData])
    

    const { push } = useHistory()
    return (
        <div>
        <h2>Engagement Proposals</h2>
        <div className='market'> 
                {RingData.map((ring) => (
                            <div className='card' onClick={() => push('/sent-engagement-proposal/' + ring.tokenID)} >
                            {/* <img src={"https://ipfs.io/ipfs/" + src.slice(7)} alt="nft artwork" /> */}
                            <img src='/assets/images/wedding-img/ring-image.jpg' alt="nft artwork" />
                            <div className="card__info">
                                <h2>{ring.name}</h2>
                                <h4>{ring.note.length >= 100 ? ring.note.substring(0, 100) + '...' : ring.note}</h4>
                                <h4>{ring.ringDescription}</h4>
                                <h4>{ring.type}</h4>
                            </div>
                                 <div className='card__infoValueParent'>
                                    <div className="card__infoValue">
                                        {ring.status == "accepted" && <button type="button" className="btn btn-success">Accepted</button>}
                                        {ring.status == "rejected" && <button type="button" className="btn btn-danger">Rejected</button>}
                                        {ring.status == "waiting" && <button type="button" className="btn btn-warning">Waiting</button>}
                                    
                                    </div>
                                </div>
                        </div>
                ))
                }
        </div>
        <h2>Marriage Proposals</h2>

        <div className='market'> 
                {MarriageData.map((data) => (
                            <div className='card' onClick={() => push('/sent-marriage-proposal/' + data.tokenID)}>
                            {/* <img src={"https://ipfs.io/ipfs/" + src.slice(7)} alt="nft artwork" /> */}
                            <img src='/assets/images/certificate.jpeg' alt="nft artwork" />
                            <div className="card__info">
                                <h2>{data.name}</h2>
                                <h4>{data.vows.length >= 100 ? data.vows.substring(0, 100) + '...' : data.vows}</h4>
                                <h4>{data.type}</h4>
                            </div>
                            <div className='card__infoValueParent'>
                                    <div className="card__infoValue">
                                        {data.status == "accepted" && <button type="button" className="btn btn-success">Accepted</button>}
                                        {data.status == "rejected" && <button type="button" className="btn btn-danger">Rejected</button>}
                                        {data.status == "waiting" && <button type="button" className="btn btn-warning">Waiting</button>}
                                    
                                    </div>
                            </div>
                        </div>
                ))
                }
        </div>
        </div>
    )
}

export default Market
