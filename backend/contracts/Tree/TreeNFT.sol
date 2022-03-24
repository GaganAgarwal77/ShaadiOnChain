// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Base64.sol";
import "./Tree1.sol";
import "./Tree2.sol";

contract TreeNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Tree {
        string name;
        string description;
        uint256 timestamp;
    }

    mapping(uint256 => Tree) public trees;

    constructor() ERC721("Tree NFT", "TREE") {}

    function createToken() public returns(uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        Tree memory tree = Tree(
            string(abi.encodePacked("Tree #", uint256(newItemId).toString())),
            "These are growing trees",
            block.timestamp
        );

        trees[newItemId] = tree;
        _mint(msg.sender, newItemId);

        return newItemId;
    }

    function buildImage(uint256 maturity) public pure returns (string memory) {
        bytes memory image;
        if (maturity == 0) {
            image = Tree1.TreeSVGToString();
        } else if (maturity == 1) {
            image = Tree2.TreeSVGToString();
        }
        string memory svg = Base64.encode(image);
        return svg;
    }

    function buildMetadata(uint256 _tokenId, uint256 maturity)
        public
        view
        returns (string memory)
    {
        Tree memory tree = trees[_tokenId];
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                tree.name,
                                '", "description":"',
                                tree.description,
                                '", "image": "',
                                "data:image/svg+xml;base64,",
                                buildImage(maturity),
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    uint[] public timestamps;

    function newtokenURI(uint256 _tokenId)
        public
        // view
        // virtual
        // override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        timestamps.push(block.timestamp);

        Tree memory tree = trees[_tokenId];
        if (block.timestamp <= tree.timestamp + 10 seconds) {
            return buildMetadata(_tokenId, 0);
        } else if (
            block.timestamp > tree.timestamp + 10 seconds &&
            block.timestamp <= tree.timestamp + 1 minutes
        ) {
            return buildMetadata(_tokenId, 1);
        }
        return buildMetadata(_tokenId, 1);
    }
}
