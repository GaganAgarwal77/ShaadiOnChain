// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Owner.sol";

contract RingNFT is ERC721URIStorage, Owner {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public mainContractAddress;
    address public marketplaceAddress;

    constructor(address mainContract, address market)
        ERC721("Shaadi Rings", "SR")
    {
        mainContractAddress = mainContract;
        marketplaceAddress = market;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        // Allows marketplace to do transactions for this NFT
        setApprovalForAll(marketplaceAddress, true);
        setApprovalForAll(mainContractAddress, true);
        return newItemId;
    }

    function approveTokenToMainContract(uint tokenId) public {
        approve(mainContractAddress, tokenId);
    }

    function getTotalNFTtokens() public view returns (uint256) {
        return _tokenIds.current();
    }

    function setMainContract(address newMainContract) public isOwner {
        mainContractAddress = newMainContract;
    }

    function setMarketplaceContract(address newMarketplace) public isOwner {
        marketplaceAddress = newMarketplace;
    }

}
