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

    string public baseLoveLetterCID;
    string public writtenLoveLetterCID;
    uint256 public maxCharLimit = 200;
    uint256 public claimPrice = 0.1 ether;

    struct Letter {
        string message;
        address creator;
    }

    mapping(uint256 => Letter) public idToletter;

    constructor(
        string memory initBaseLoveLetterCID,
        string memory initWrittenLoveLetterCID
    ) ERC721("Love Letter", "LL") {
        setBaseLoveLetterCID(initBaseLoveLetterCID);
        setWrittenLoveLetterCID(initWrittenLoveLetterCID);
    }

    function claim() public payable {
        require(
            msg.value == claimPrice,
            "Please submit the asking price in order to complete the purchase"
        );

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        Letter memory newLetter = Letter(
            "",
            msg.sender
        );
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
            return writtenLoveLetterCID;
        } else {
            return baseLoveLetterCID;
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
    function setBaseLoveLetterCID(string memory _newBaseLoveLetterCID) public onlyOwner {
        baseLoveLetterCID = _newBaseLoveLetterCID;
    }

    function setWrittenLoveLetterCID(string memory _newWrittenLoveLetterCID) public onlyOwner {
        writtenLoveLetterCID = _newWrittenLoveLetterCID;
    }

    function setMaxCharLimit(uint256 _newValue) public onlyOwner {
        maxCharLimit = _newValue;
    }

    function withdraw() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw");

        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Amount Transfer failed");
    }
}
