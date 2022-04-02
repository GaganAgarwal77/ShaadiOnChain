// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TreeNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Tree {
        string name;
        string description;
        uint256 timestamp;
    }

    string public tree1;
    string public tree2;
    string public tree3;
    string public tree4;
    string public tree5;
    string public tree6;

    mapping(uint256 => Tree) public trees;
    mapping(address => uint256) public addrToTokenId;

    constructor(
        string memory initTree1,
        string memory initTree2,
        string memory initTree3,
        string memory initTree4,
        string memory initTree5,
        string memory initTree6
    ) ERC721("Tree NFT", "TREE") {
        setTreeCID(initTree1, 1);
        setTreeCID(initTree2, 2);
        setTreeCID(initTree3, 3);
        setTreeCID(initTree4, 4);
        setTreeCID(initTree5, 5);
        setTreeCID(initTree6, 6);
    }

    function setTreeCID(string memory _newTreeCID, uint treeNum) public onlyOwner {
        if(treeNum == 1) {
            tree1 = _newTreeCID;
        }
        else if(treeNum == 2) {
            tree2 = _newTreeCID;
        }
        else if(treeNum == 3) {
            tree3 = _newTreeCID;
        }
        else if(treeNum == 4) {
            tree4 = _newTreeCID;
        }
        else if(treeNum == 5) {
            tree5 = _newTreeCID;
        }
        else if(treeNum == 6) {
            tree6 = _newTreeCID;
        }
    }

    function createToken(address partner) public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        Tree memory tree = Tree(
            string(abi.encodePacked("Tree #", uint256(newItemId).toString())),
            "These are growing trees",
            block.timestamp
        );

        trees[newItemId] = tree;
        _mint(msg.sender, newItemId);
        addrToTokenId[msg.sender] = newItemId;

        _tokenIds.increment();
        uint256 partnerItemId = _tokenIds.current();
        trees[partnerItemId] = tree;
        _mint(msg.sender, partnerItemId);
        safeTransferFrom(msg.sender, partner, partnerItemId);
        addrToTokenId[partner] = partnerItemId;
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

        Tree memory tree = trees[_tokenId];
        uint timediff1 = 30 seconds;
        uint timediff2 = 2 minutes;
        uint timediff3 = 5 minutes;
        uint timediff4 = 10 minutes;
        uint timediff5 = 15 minutes;

        if (block.timestamp <= (tree.timestamp + timediff1)) {
            return tree1;
        } 
        else if (
            (block.timestamp > (tree.timestamp + timediff1)) &&
            (block.timestamp <= (tree.timestamp + timediff2))
        ) {
            return tree2;
        }
        else if (
            (block.timestamp > (tree.timestamp + timediff2)) &&
            (block.timestamp <= (tree.timestamp + timediff3))
        ) {
            return tree3;
        }
        else if (
            (block.timestamp > (tree.timestamp + timediff3)) &&
            (block.timestamp <= (tree.timestamp + timediff4))
        ) {
            return tree4;
        }
        else if (
            (block.timestamp > (tree.timestamp + timediff4)) &&
            (block.timestamp <= (tree.timestamp + timediff5))
        ) {
            return tree5;
        }
        return tree6;
    }
}
