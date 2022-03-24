import Web3 from "web3";
import { ShaadiOnChain_ABI } from "./abi/ShaadiOnChainABI";
import { ShaadiOnChain_contract_addr } from "./constants";

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

const ShaadiOnChain_contract = new web3.eth.Contract(
  ShaadiOnChain_ABI,
  ShaadiOnChain_contract_addr
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


