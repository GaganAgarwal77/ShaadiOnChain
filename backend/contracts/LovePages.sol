// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LovePages is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string baseURI;
    uint256 public requiredRingsAmount = 1;
    uint256 public maxCharLimit = 200;
    string public notRevealedUri;
    address public ringAddress;

    struct Page {
        string message;
    }

    mapping(uint256 => Page) public pages;

    constructor(
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        address _initringAddress
    ) ERC721("Love Pages", "LP") {
        setBaseURI(_initBaseURI);
        setNotRevealedURI(_initNotRevealedUri);
        setringAddress(_initringAddress);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function claim() public {
        IERC721 token = IERC721(ringAddress);
        uint256 ownedAmount = token.balanceOf(msg.sender);
        require(
            ownedAmount >= requiredRingsAmount,
            "You don't own enough Ring NFTs"
        );

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        Page memory newPage = Page("");
        pages[newItemId] = newPage;
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
        Page memory currentPage = pages[_tokenId];
        if (bytes(currentPage.message).length > 0) {
            return _baseURI();
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
        Page storage currentPage = pages[_tokenId];
        require(bytes(currentPage.message).length == 0, "Message already set.");
        currentPage.message = _newMessage;
    }

    function readMessage(uint256 _tokenId)
        public
        view
        returns (string memory message)
    {
        Page memory currentPage = pages[_tokenId];
        return currentPage.message;
    }

    // Only owner
    function setringAddress(address _newAddress) public onlyOwner {
        ringAddress = _newAddress;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setRequiredRingsAmount(uint256 _newValue) public onlyOwner {
        requiredRingsAmount = _newValue;
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

        (bool success, ) = payable(owner()).call{value: address(this).balance}(
            ""
        );
        require(success, "Amount Transfer failed");
    }
}
