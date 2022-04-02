// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./Owner.sol";

contract ShaadiOnChain is Owner {
    using Counters for Counters.Counter;
    Counters.Counter private _userIds;
    Counters.Counter private _proposalIds;
    Counters.Counter private _marriageProposalIds;

    address RingNFTContract;

    //#################################################################
    //# User
    //#################################################################

    enum Gender { MALE, FEMALE, OTHER }

    struct User {
        uint256 id;
        string name;
        Gender gender;
        address wallet;
        bool engaged;
        bool married;
        address partner;
    }

    mapping(address => User) public addrToUser;
    mapping(uint => address) public idToUserAddr;

    function registerUser(string memory _name, Gender _gender) public ValidSender {
        require(
            msg.sender != addrToUser[msg.sender].wallet,
            "User with this wallet address already exists!"
        );

        _userIds.increment();
        uint256 userId = _userIds.current();

        addrToUser[msg.sender] = User(
            userId,
            _name,
            _gender,
            msg.sender,
            false,
            false,
            address(0)
        );

        idToUserAddr[userId] = msg.sender;
    }

    function getUserCount() public view returns (uint256) {
        return _userIds.current();
    }

    //#################################################################
    //# Proposal Stage
    //#################################################################

    enum ProposalStatus {
        PENDING,
        ACCEPTED,
        REJECTED
    }

    struct Proposal {
        uint256 id;
        address proposer;
        uint256 proposerRingTokenId;
        string proposerNote;
        address proposee; // Person who is getting proposed
        uint256 proposeeRingTokenId;
        string proposeeNote;
        ProposalStatus status;
    }

    mapping(address => uint256[]) public userAddrToProposalIds;
    mapping(uint256 => Proposal) public idToProposal;

    function createProposal(
        address _proposee,
        uint256 ringTokenId,
        string memory note
    ) public ValidSender ValidUser(_proposee) ValidContract(RingNFTContract) {
        require(
            IERC721(RingNFTContract).ownerOf(ringTokenId) == msg.sender,
            "You are not the owner of the given NFT"
        );

        _proposalIds.increment();
        uint256 proposalId = _proposalIds.current();

        idToProposal[proposalId] = Proposal(
            proposalId,
            msg.sender,
            ringTokenId,
            note,
            _proposee,
            0,
            "",
            ProposalStatus.PENDING
        );

        userAddrToProposalIds[msg.sender].push(proposalId);
        userAddrToProposalIds[_proposee].push(proposalId);
    }

    function respondToProposal(
        uint256 proposalId,
        bool acceptProposal,
        uint256 ringTokenId,
        string memory note
    ) public ValidSender ValidUser(msg.sender) ValidContract(RingNFTContract) {
        Proposal storage proposal = idToProposal[proposalId];
        require(
            proposal.id > 0 && proposal.id <= getProposalsCount(),
            "Proposal with given ID does not exist"
        );
        require(proposal.proposee == msg.sender, "This proposal is not for you");

        if (acceptProposal) {
            require(
                IERC721(RingNFTContract).ownerOf(ringTokenId) == msg.sender,
                "You are not the owner of the given NFT"
            );
            proposal.status = ProposalStatus.ACCEPTED;
            proposal.proposeeRingTokenId = ringTokenId;

            User storage proposer = addrToUser[proposal.proposer];
            proposer.engaged = true;
            proposer.partner = proposal.proposee;

            User storage proposee = addrToUser[proposal.proposee];
            proposee.engaged = true;
            proposee.partner = proposal.proposer;

            IERC721(RingNFTContract).transferFrom(
                proposal.proposer,
                proposal.proposee,
                proposal.proposerRingTokenId
            );

            IERC721(RingNFTContract).transferFrom(
                proposal.proposee,
                proposal.proposer,
                proposal.proposeeRingTokenId
            );
        } else {
            proposal.status = ProposalStatus.REJECTED;
        }
        proposal.proposeeNote = note;
    }

    function getUserProposalsCount(address _userAddress)
        public
        view
        returns (uint256)
    {
        return userAddrToProposalIds[_userAddress].length;
    }

    function getProposalsCount() public view returns (uint256) {
        return _proposalIds.current();
    }

    //#################################################################
    //# Marriage Stage
    //#################################################################

    struct MarriageProposal {
        uint256 id;
        address proposer;
        string proposerVows;
        address proposee;
        string proposeeVows;
        ProposalStatus status;
        uint marriageAcceptTime;
    }

    mapping(address => uint256) public userAddrToMarriageProposalId;
    mapping(uint256 => MarriageProposal) public idToMarriageProposal;

    function createMarriageProposal(string memory vows)
        public
        ValidSender
        ValidUser(msg.sender)
    {
        User storage proposer = addrToUser[msg.sender];
        require(
            proposer.partner != address(0),
            "You need to have a partner to send marriage proposal"
        );

        _marriageProposalIds.increment();
        uint256 proposalId = _marriageProposalIds.current();

        idToMarriageProposal[proposalId] = MarriageProposal(
            proposalId,
            proposer.wallet,
            vows,
            proposer.partner,
            "",
            ProposalStatus.PENDING,
            0
        );

        userAddrToMarriageProposalId[proposer.wallet] = proposalId;
        userAddrToMarriageProposalId[proposer.partner] = proposalId;
    }

    function respondToMarriageProposal(
        uint256 proposalId,
        bool acceptProposal,
        string memory vows
    ) public ValidSender ValidUser(msg.sender) {
        MarriageProposal storage proposal = idToMarriageProposal[proposalId];
        require(
            proposal.id > 0 && proposal.id <= getMarriageProposalsCount(),
            "Marriage Proposal with given ID does not exist"
        );
        require(proposal.proposee == msg.sender, "This proposal is not for you");

        if (acceptProposal) {
            proposal.status = ProposalStatus.ACCEPTED;

            User storage proposer = addrToUser[proposal.proposer];
            proposer.married = true;

            User storage proposee = addrToUser[proposal.proposee];
            proposee.married = true;

            proposal.proposeeVows = vows;
            proposal.marriageAcceptTime = block.timestamp;
        } else {
            proposal.status = ProposalStatus.REJECTED;
        }
    }

    function getMarriageProposalsCount() public view returns (uint256) {
        return _marriageProposalIds.current();
    }

    //#################################################################
    //# Utility functions
    //#################################################################

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

    modifier ValidSender() {
        require(msg.sender != address(0), "Wallet address cannot be 0x00...");
        _;
    }

    modifier ValidUser(address userAddr) {
        require(
            userAddr == addrToUser[userAddr].wallet,
            "User with this wallet address does not exist!"
        );
        _;
    }
}
