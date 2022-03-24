// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./Owner.sol";

contract NFTMarketplace is ReentrancyGuard, Owner {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address RingNFTContract;

    enum RingType {
        MALE,
        FEMALE
    }

    struct RingItem {
        uint256 itemId;
        uint256 tokenId;
        address payable owner;
        uint256 price;
        RingType ringtype;
        bool sold;
    }

    mapping(uint256 => RingItem) private idToRingItem;

    function createRingItem(
        uint256 _tokenId,
        uint256 _price,
        RingType _ringtype
    ) public nonReentrant ValidContract(RingNFTContract) {
        require(_price > 0, "Price must be at least 1 wei");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToRingItem[itemId] = RingItem(
            itemId,
            _tokenId,
            payable(msg.sender),
            _price,
            _ringtype,
            false
        );

        IERC721(RingNFTContract).transferFrom(
            msg.sender,
            address(this),
            _tokenId
        );
    }

    function createRingSale(uint256 _itemId)
        public
        payable
        nonReentrant
        ValidContract(RingNFTContract)
    {
        uint256 price = idToRingItem[_itemId].price;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        uint256 tokenId = idToRingItem[_itemId].tokenId;
        idToRingItem[_itemId].owner.transfer(msg.value);
        IERC721(RingNFTContract).transferFrom(
            address(this),
            msg.sender,
            tokenId
        );

        idToRingItem[_itemId].owner = payable(msg.sender);
        idToRingItem[_itemId].sold = true;

        _itemsSold.increment();
    }

    function fetchAllOnSaleRingItems() public view returns (RingItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 currentIdx = 0;

        RingItem[] memory items = new RingItem[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            RingItem storage currentItem = idToRingItem[i + 1];
            if (currentItem.sold == false) {
                items[currentIdx] = currentItem;
                currentIdx += 1;
            }
        }

        return items;
    }

    function fetchMyRingNFTs() public view returns (RingItem[] memory) {
        uint256 itemCount = _itemIds.current();

        uint256 myItemCount = 0;
        uint256 currentIdx = 0;

        for (uint256 i = 0; i < itemCount; i++) {
            if (idToRingItem[i + 1].owner == msg.sender) {
                myItemCount += 1;
            }
        }

        RingItem[] memory items = new RingItem[](myItemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            RingItem storage currentItem = idToRingItem[i + 1];
            if (currentItem.owner == msg.sender) {
                items[currentIdx] = currentItem;
                currentIdx += 1;
            }
        }

        return items;
    }

    function fetchRingItem(uint256 itemId)
        public
        view
        returns (RingItem memory)
    {
        RingItem storage currentItem = idToRingItem[itemId];
        return currentItem;
    }

    function setRingNFTContract(address newRingNFTContract) public isOwner {
        RingNFTContract = newRingNFTContract;
    }

    modifier ValidContract(address contractAddr) {
        require(
            contractAddr != address(0),
            "Contract address cannot be 0x00..."
        );
        _;
    }
}
