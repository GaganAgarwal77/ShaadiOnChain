import React from 'react'
import Card from './card'
import  '../assets/Market.css'

const RingData = [
  {
      tokenID:"1",
      name: "Ring 1",
      description: "Description of ring",
      company:"Company1",
      price:"1",
      type:"Male"
  },
  {
      tokenID:"2",
      name: "Ring 2",
      description: "Description of ring",
      company:"Company2",
      price:"1",
      type:"Female"
  },
  {
      tokenID:"3",
      name: "Ring 3",
      description: "Description of ring",
      company:"Company3",
      price:"1",
      type:"Male"
  },
  {
      tokenID:"4",
      name: "Ring 4",
      description: "Description of ring",
      company:"Company4",
      price:"1",
      type:"Female"
  },
  {
      tokenID:"5",
      name: "Ring 5",
      description: "Description of ring",
      company:"Company5",
      price:"1",
      type:"Male"
  },

]

function Market() {
    return (
        <div className='market'> 
                {RingData.map((ring) => (
                    <Card
                    key={ring.tokenID}
                    tokenID={ring.tokenID}
                    name={ring.name}
                    description={ring.description}
                    company={ring.company}
                    price={ring.price}
                    type={ring.type}
                    />
                ))
                }
        </div>
    )
}

export default Market
