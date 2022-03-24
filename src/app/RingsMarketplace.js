import React from 'react'
import Card from './card'
import  '../assets/Market.css'

const RingData = [
  {
      tokenID:"1",
      name: "Ring 1",
      description: "Description of ring",
      src:"Source1",
      price:"1",
  },
  {
      tokenID:"2",
      name: "Ring 2",
      description: "Description of ring",
      src:"Source1",
      price:"1",
  },
  {
      tokenID:"3",
      name: "Ring 3",
      description: "Description of ring",
      src:"Source1",
      price:"1",
  },
  {
      tokenID:"4",
      name: "Ring 4",
      description: "Description of ring",
      src:"Source1",
      price:"1",
  },
  {
      tokenID:"5",
      name: "Ring 5",
      description: "Description of ring",
      src:"Source1",
      price:"1",
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
                    src={ring.image}
                    price={ring.price}
                    />
                ))
                }
        </div>
    )
}

export default Market
