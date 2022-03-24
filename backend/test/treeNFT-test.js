const { expect } = require('chai');
const { ethers } = require("hardhat");

var chai = require('chai');
const BN = require('bn.js');
chai.use(require('chai-bn')(BN));

// const DECIMALS='18'
// const INITIAL_PRICE='200000000000000000000'

describe('TreeNFTContract Unit Test', function () {
    let treeNFTContract;

    before(async function () {
      const Tree1Contract = await ethers.getContractFactory("Tree1");
      const tree1Contract = await Tree1Contract.deploy();
  
      const Tree2Contract = await ethers.getContractFactory("Tree2");
      const tree2Contract = await Tree2Contract.deploy();
  
      const TreeNFTContract = await ethers.getContractFactory("TreeNFT", {
          libraries: {
              Tree1: tree1Contract.address,
              Tree2: tree2Contract.address
          }
      });
      treeNFTContract = await TreeNFTContract.deploy();
      await treeNFTContract.deployed();  
      console.log("Contract deployed to:", treeNFTContract.address);

      });


    it('Create Tree NFT Token', async function (done) {
        let tokenIdObj = await treeNFTContract.createToken();
        // console.log(tokenIdObj);
        let tokenId = tokenIdObj.value.toNumber();

        let tokenUriObj = await treeNFTContract.tokenURI(1);

        let tokenUriObj2 = await treeNFTContract.tokenURI(1);

        // let tokenUriObj3 = await treeNFTContract.tokenURI(1);

        let buildMetadataObj = await treeNFTContract.buildMetadata(1, 1);
        // console.log(buildMetadataObj);

        if(buildMetadataObj === tokenUriObj) {
          console.log("FIRST")
          console.log(tokenUriObj)
        }

        if(buildMetadataObj === tokenUriObj2) {
          console.log("SECOND")
          console.log(tokenUriObj2)
        }

        if(buildMetadataObj === tokenUriObj3) {
          console.log("THIRD")
          console.log(tokenUriObj2)
        }

        
      });


    // it('retrieve returns a value previously stored', async function () {
    //   await myFirstContract.setNumber(77);
    //   expect((await myFirstContract.getNumber()).toString()).to.equal('77');
    // });

    // it('gets a price feed value', async function () {
    //     let tokenIdObj = await myFirstContract.getLatestPrice();
    //     console.log('price:' + new ethers.BigNumber.from(tokenIdObj._hex).toString())
    //     expect((new ethers.BigNumber.from(tokenIdObj._hex).toString())).equals(INITIAL_PRICE).toString()
    //   });


  });