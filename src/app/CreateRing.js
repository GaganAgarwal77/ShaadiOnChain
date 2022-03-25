import React, { useState } from 'react'
import '../assets/CreateRing.css'

import { NFTStorage } from 'nft.storage'

import { useHistory } from 'react-router-dom'
import { web3, mintRingNFT, sellRingOnMarketplace } from "./services/web3";

require('dotenv').config()

function CreateRing({wallet, isLoggedIn}) {      

  const { push, goBack } = useHistory()

  const dataURItoBlob = (dataURI) => {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var bb = new Blob([ab], {type:'image/*'});
    return bb;
  }

  const fileToDataUri = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result)
      };
      reader.readAsDataURL(file);
  })
    

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dataUri, setDataUri] = useState('');
    const [price, setPrice] = useState('0');
    const [ringType, setRingType] = useState('Male');
    const [isLoadingMint, setIsLoadingMint] = useState(false);
    const [isLoadingSell, setIsLoadingSell] = useState(false);
    const [tokenId, setTokenId] = useState('0');

    const onChange = (file) => {
    
      if(!file) {
        setDataUri('');
        return;
      }
  
      fileToDataUri(file)
        .then(dataUri => {
          setDataUri(dataUri)
        })
      
    }
    

    const handleMintNFT = async (e) =>  {
      try{
        setIsLoadingMint(true);
        e.preventDefault();
        
        var image = dataURItoBlob(dataUri);
        const client = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE })
        const nft = { name, description, image, ringType:ringType };
        const metadata = await client.store(nft);
        window.alert("Successfully stored on IPFS");

        var storageUrl = metadata.url;
        // var storageUrl = "hello";
        const retTokenId = await mintRingNFT(storageUrl);
        setTokenId(retTokenId);
        console.log(retTokenId);
        setIsLoadingMint(false);
      }
      catch (e) {
        console.log(e);
        window.alert('an error has occured, try again!');
        setIsLoadingMint(false);
      }
    }

    const handleSellNFT = async (e) =>  {
      try{
        setIsLoadingSell(true);
        e.preventDefault();
        
        let ringTypeNum;
        if(ringType === 'Male') ringTypeNum = 0;
        else if(ringType === 'Female') ringTypeNum = 1;

        await sellRingOnMarketplace(
          tokenId, 
          web3.utils.toWei(price), 
          ringTypeNum
        );

        setIsLoadingSell(false);
        push('/rings-marketplace');
      }
      catch (e) {
        console.log(e);
        window.alert('an error has occured, try again!');
        setIsLoadingSell(false);
      }
    }

    return (
        <div className="create">
            <div className="goback">
              <img src="/assets/images/wedding-img/icon/next.png" onClick={goBack} alt="Go back" className='gobackButton'/>
            </div>
            <div className='poweredBy'>
                  <h3>Powered by NFT.Storage </h3>   
            </div>
            <div className="create__artwork">
              <img src={dataUri===''? 'https://thumbs.gfycat.com/EqualPowerfulKoodoo-size_restricted.gif': dataUri} alt="upload artwork"/>     
            </div>

            <div className="create__details">
              <h1>Mint a new Ring 🖌 </h1>
              <form onSubmit={handleMintNFT}>
                  <label>Name</label>
                  <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  />

                  <label>Description</label>
                  <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  ></textarea>

                  <label>Image/GIF Upload</label>
                  <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />

                  <label>Type of ring</label>
                  <select
                  value={ringType}
                  onChange={(e) => setRingType(e.target.value)}
                  >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  </select>

                  <div className="create__submitButton">
                    <button>Mint NFT </button> {isLoadingMint &&  " LOADING "}
                  </div>
              </form>
                
              <form onSubmit={handleSellNFT}>
                  <label>Price in ETH</label>
                  <input 
                    required
                    type="number" 
                    min="0.01"
                    step="0.01" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  <div className="create__submitButton">
                    <button>Sell ring </button> {isLoadingSell &&  " LOADING "}
                  </div>
              </form>
            </div>
        </div>
    )
}

export default CreateRing
