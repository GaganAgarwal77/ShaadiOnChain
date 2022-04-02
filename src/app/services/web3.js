import Web3 from "web3";
import { ShaadiOnChain_ABI } from "./abi/ShaadiOnChainABI";
import { RingMarketplace_ABI } from "./abi/RingMarketplaceABI";
import { RingNFT_ABI } from "./abi/RingNFTABI";
import { LoveLetter_ABI } from "./abi/LoveLetterABI";
import { MarriageCertificate_ABI } from "./abi/MarriageCertificateABI";
import { TREENFT_ABI } from "./abi/TreeNFTABI";

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

const LoveLetter_contract = new web3.eth.Contract(
  LoveLetter_ABI,
  process.env.REACT_APP_LOVE_LETTER
);

const MarriageCertificateNFT_contract = new web3.eth.Contract(
  MarriageCertificate_ABI,
  process.env.REACT_APP_MARRIAGE_CERTIFICATE
);

const TreeNFT_contract = new web3.eth.Contract(
  TREENFT_ABI,
  process.env.REACT_APP_TREE_NFT
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

  try {
    const user = await ShaadiOnChain_contract.methods.addrToUser(address).call();
    return user;
  }
  catch (err) {
    window.alert("User does not exist");
    window.location.reload();
  };
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


export const fetchNumUser = async (tokenId) => {
  const result = await ShaadiOnChain_contract.methods
    .getUserCount()
    .call();
  return result;
}

export const fetchAllUsers = async (tokenId) => {
  const numUsers = await fetchNumUser();

  let usersList = []
  for(var i = 1; i <= numUsers; i++) {
    const user = await ShaadiOnChain_contract.methods
      .idToUserAddr(i)
      .call();
    usersList.push(user);
  }

  return usersList;
}


//#################################################################
//# Ring NFT
//#################################################################

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

export const tokenURI = async (tokenId) => {
  const result = await RingNFT_contract.methods
    .tokenURI(tokenId)
    .call();
  return result;
}

export const isRingNFTOwner = async (tokenId) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const result = await RingNFT_contract.methods
    .ownerOf(tokenId)
    .call();
  return result === account ? true : false
}

export const approveRingtoShaadiContract = async (tokenId) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  await RingNFT_contract.methods
    .approveTokenToMainContract(tokenId)
    .send({
      from: account,
    })
    .on("error", function (error, receipt) {
      window.alert("An error has occured!");
      return false;
    });
    return true;
}

//#################################################################
//# Ring Marketplace
//#################################################################


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

  let ringOnSale = []
  result.forEach(async nft => {
    if (nft.tokenId !== "0") {
      ringOnSale.push(nft)
    }
  })
  return ringOnSale;
}

export const myRingNFTs = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const result = await RingMarketplace_contract.methods
    .fetchMyRingNFTs()
    .call({
      from: account,
    });

  let myRings = []
  result.forEach(async nft => {
    if (nft.tokenId !== "0") {
      myRings.push(nft)
    }
  })
  return myRings;
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
  await RingMarketplace_contract.methods
    .createRingSale(itemId)
    .send({
      from: account,
      value: price,
    })
    .on("transactionHash", function (hash) {})
    .on("receipt", function (receipt) {})
    .on("confirmation", function (confirmationNumber, receipt) {})
    .on("error", function (error, receipt) {
      window.alert("An error has occured!");
      return false;
    });
    return true;
};

//#################################################################
//# Engagement Stage
//#################################################################

export const createEngagementProposal = async (loverAddr, ringTokenId, note) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  await ShaadiOnChain_contract.methods
    .createProposal(loverAddr, ringTokenId, note)
    .send({
      from: account,
    })
    .on("error", function (error, receipt) {
      window.alert("An error has occured!");
      return false;
    });
    return true;
}


export const respondToEngagementProposal = async (proposalId, response, ringTokenId, note) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  await ShaadiOnChain_contract.methods
    .respondToProposal(proposalId, response, ringTokenId, note)
    .send({
      from: account,
    })
    .on("error", function (error, receipt) {
      window.alert("An error has occured!");
      return false;
    });
    return true;
}


export const getAllEngagementProposals = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const proposalCount = await ShaadiOnChain_contract.methods
    .getUserProposalsCount(account)
    .call();

  let proposals = []

  for (var i = 0; i < proposalCount; i++) {
    const proposalId = await ShaadiOnChain_contract.methods
    .userAddrToProposalIds(account, i)
    .call();

    const proposal = await getEngagementProposalById(proposalId)
    proposals.push(proposal);
  }
  return proposals;
}


export const getEngagementProposalById = async (proposalId) => {
  const proposal = await ShaadiOnChain_contract.methods
  .idToProposal(proposalId)
  .call();

  return proposal;
}

//#################################################################
//# Marriage Stage
//#################################################################

export const createMarriageProposal = async (vows) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  await ShaadiOnChain_contract.methods
    .createMarriageProposal(vows)
    .send({
      from: account,
    })
    .on("error", function (error, receipt) {
      window.alert("An error has occured!");
      return false;
    });
    return true;
}


export const getMarriageProposalByUser = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const proposalId = await ShaadiOnChain_contract.methods
    .userAddrToMarriageProposalId(account)
    .call();

  if(proposalId === "0") {
    return false;
  }

  const proposal = await getMarriageProposalById(proposalId)
  return proposal;
}


export const getMarriageProposalById = async (proposalId) => {
  const proposal = await ShaadiOnChain_contract.methods
  .idToMarriageProposal(proposalId)
  .call();

  return proposal;
}


export const respondToMarriageProposal = async (proposalId, response, vows) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  await ShaadiOnChain_contract.methods
    .respondToMarriageProposal(proposalId, response, vows)
    .send({
      from: account,
    })
    .on("error", function (error, receipt) {
      window.alert("An error has occured!");
      return false;
    });
    return true;
}


//#################################################################
//# Love Letters
//#################################################################

export const purchaseLoveLetter = async () => {
  const price = await getLoveLetterPrice();
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  await LoveLetter_contract.methods
    .claim()
    .send({
      from: account,
      value: price,
    })
    .on("transactionHash", function (hash) {})
    .on("receipt", function (receipt) {})
    .on("confirmation", function (confirmationNumber, receipt) {})
    .on("error", function (error, receipt) {
      window.alert("An error has occured!");
      return false;
    });
    return true;
};

export const getLoveLettersForUser = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const tokenIds = await LoveLetter_contract.methods
    .walletOfOwner(account)
    .call();

  return tokenIds;
}

export const getLoveLetterById = async (tokenId) => {
  const result = await LoveLetter_contract.methods
    .idToletter(tokenId)
    .call();  
  return result;
}

export const getLoveLetterPrice = async () => {
  const price = await LoveLetter_contract.methods
    .claimPrice()
    .call();  
  return price;
}


export const tokenURILoveLetter = async (tokenId) => {
  const result = await LoveLetter_contract.methods
    .tokenURI(tokenId)
    .call();
  return result;
}

export const writeMessage = async (tokenId, message) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  await LoveLetter_contract.methods
    .setMessage(tokenId, message)
    .send({
      from: account,
    })
    .on("error", function (error, receipt) {
      window.alert("An error has occured!");
      return false;
    });
    return true;
}

export const sendLoveLetter = async (tokenId, loverAddr) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  await LoveLetter_contract.methods
    .safeTransferFrom(account, loverAddr, tokenId)
    .send({
      from: account,
    })
    .on("error", function (error, receipt) {
      window.alert("An error has occured!");
      return false;
    });
    return true;
}

//#################################################################
//# Marriage Certificate 
//#################################################################

export const mintMarriageCertificate = async (tokenURI, partner) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const result = await MarriageCertificateNFT_contract.methods
    .createToken(tokenURI, partner)
    .send({
      from: account,
    });

  return result;
}

export const marriageCertificateTokenURI = async (tokenId) => {
  const result = await MarriageCertificateNFT_contract.methods
    .tokenURI(tokenId)
    .call();
  return result;
}

export const marriageCertificateTokenId = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const result = await MarriageCertificateNFT_contract.methods
    .addrToTokenId(account)
    .call();
  return result;
}

//#################################################################
//# Marriage Tree
//#################################################################

export const mintTree = async (partnerAddr) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  await TreeNFT_contract.methods
    .createToken(partnerAddr)
    .send({
      from: account,
    })
    .on("error", function (error, receipt) {
      window.alert("An error has occured!");
      return false;
    });
    
    return true;
}

export const treeTokenURI = async (tokenId) => {
  const result = await TreeNFT_contract.methods
    .tokenURI(tokenId)
    .call();
  return result;
}
