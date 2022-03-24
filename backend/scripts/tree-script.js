const { ethers } = require("hardhat");

async function main() {
    // We get the contract to deploy
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
    const treeNFTContract = await TreeNFTContract.deploy();

    console.log("Contract deployed to:", treeNFTContract.address);
  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });