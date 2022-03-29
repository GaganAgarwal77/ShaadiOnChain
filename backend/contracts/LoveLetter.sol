// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LoveLetter is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string baseURI;
    string notRevealedUri;
    uint256 public maxCharLimit = 200;
    uint256 public claimPrice = 1 ether;

    struct Letter {
        string message;
    }

    mapping(uint256 => Letter) public idToletter;

    constructor(
        string memory initBaseURI,
        string memory initNotRevealedUri
    ) ERC721("Love Letter", "LL") {
        setBaseURI(initBaseURI);
        setNotRevealedURI(initNotRevealedUri);
    }

    function claim() public payable {
        require(
            msg.value == claimPrice,
            "Please submit the asking price in order to complete the purchase"
        );

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        Letter memory newLetter = Letter("");
        idToletter[newItemId] = newLetter;
        _safeMint(msg.sender, newItemId);
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory ownerTokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            ownerTokenIds[i] = tokenOfOwnerByIndex(_owner, i); // IERC721 function
        }
        return ownerTokenIds;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        Letter memory currLetter = idToletter[_tokenId];
        if (bytes(currLetter.message).length > 0) {
            return baseURI;
        } else {
            return notRevealedUri;
        }
    }

    function setMessage(uint256 _tokenId, string memory _newMessage) public {
        require(
            msg.sender == ownerOf(_tokenId),
            "You are not the owner of this NFT."
        );
        bytes memory strBytes = bytes(_newMessage);
        require(strBytes.length <= maxCharLimit, "Message is too long.");
        Letter storage currLetter = idToletter[_tokenId];
        require(bytes(currLetter.message).length == 0, "Message already set.");
        currLetter.message = _newMessage;
    }

    function readMessage(uint256 _tokenId)
        public
        view
        returns (string memory message)
    {
        Letter memory currLetter = idToletter[_tokenId];
        return currLetter.message;
    }

    // Only owner
    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setMaxCharLimit(uint256 _newValue) public onlyOwner {
        maxCharLimit = _newValue;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function withdraw() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Amount Transfer failed");
    }
}
