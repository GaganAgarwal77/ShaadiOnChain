import Web3 from "web3";
import { ShaadiOnChain_ABI } from "./abi/ShaadiOnChainABI";
import { RingMarketplace_ABI } from "./abi/RingMarketplaceABI";
import { RingNFT_ABI } from "./abi/RingNFTABI";

require('dotenv').config()

export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

export const web3 = new Web3(Web3.givenProvider);

export const loadAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  return account;
};

//#################################################################
//# Contracts
//#################################################################

const ShaadiOnChain_contract = new web3.eth.Contract(
  ShaadiOnChain_ABI,
  process.env.REACT_APP_SHAADIONCHAIN
);

const RingMarketplace_contract = new web3.eth.Contract(
  RingMarketplace_ABI,
  process.env.REACT_APP_RINGMARKETPLACE
);

const RingNFT_contract = new web3.eth.Contract(
  RingNFT_ABI,
  process.env.REACT_APP_RINGNFT
);

//#################################################################
//# Users
//#################################################################

export const getUser = async (address) => {
  // Optional parameter
  if (address === undefined) {
    const accounts = await web3.eth.getAccounts();
    address = accounts[0];
  }
  const user = await ShaadiOnChain_contract.methods.addrToUser(address).call();
  return user;
};

export const registerUser = async (name, gender) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const result = await ShaadiOnChain_contract.methods
  .registerUser(name, gender)
  .send({
    from: account,
  });
  return result;
};


export const mintRingNFT = async (url) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const result = await RingNFT_contract.methods
    .createToken(url)
    .send({
      from: account,
    });

  const tokenId = result.events.Transfer.returnValues.tokenId;
  return tokenId;
}

export const sellRingOnMarketplace = async (tokenId, price, ringType) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  await RingMarketplace_contract.methods
    .createRingItem(tokenId, price, ringType)
    .send({
      from: account,
    });
}


export const saleRingNFTs = async () => {
  const result = await RingMarketplace_contract.methods
    .fetchAllOnSaleRingItems()
    .call();
  return result;
}

export const tokenURI = async (tokenId) => {
  const result = await RingNFT_contract.methods
    .tokenURI(tokenId)
    .call();
  return result;
}


export const getRingItem = async (itemId) => {
  const result = await RingMarketplace_contract.methods
    .fetchRingItem(itemId)
    .call();
  return result;
}


export const purchaseRing = async (itemId, price) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const result = await RingMarketplace_contract.methods
    .createRingSale(itemId)
    .send({
      from: account,
      value: price,
    })
    .on("transactionHash", function (hash) {})
    .on("receipt", function (receipt) {})
    .on("confirmation", function (confirmationNumber, receipt) {
      window.alert("Purchase is successfully completed!");
    })
    .on("error", function (error, receipt) {
      window.alert("An error has occured!");
    });

  // window.location.reload();
  console.log(result);
};
