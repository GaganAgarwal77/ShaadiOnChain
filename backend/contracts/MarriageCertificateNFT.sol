// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Owner.sol";

contract MarriageCertificateNFT is ERC721URIStorage, Owner {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Marriage Certificate", "MC") {}

    function createToken(string memory tokenURI, address partner) public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        uint256 partnerItemId = _tokenIds.current();
        _mint(msg.sender, partnerItemId);
        _setTokenURI(partnerItemId, tokenURI);
        safeTransferFrom(msg.sender, partner ,partnerItemId);
    }

    function getTotalNFTtokens() public view returns (uint256) {
        return _tokenIds.current();
    }
}
