//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./IPoll.sol";

abstract contract BasePoll is IPoll {
    struct Proposal {
        uint256 voteCount;
        uint256 voteWeight;
        bytes32 name;
    }

    struct Voter {
        bool voted;
        uint8 vote; // index of the voted proposal
        address delegate;
        uint256 weight;
        //uint timeStamp;
    }

    bytes32 public pollName;
    bytes32 public pollType;
    bytes32 public voterBaseLogic;
    uint256 public startTime;
    uint256 public endTime;

    Proposal[] public proposals;
    address[] public protocolAddresses;

    mapping(address => Voter) public voters;

    modifier isValidVoter() {
        require(canVote(msg.sender), "Not a valid voter");
        _;
    }

    modifier isPollStarted() {
        require(hasPollStarted(), "Poll hasn't started");
        _;
    }

    constructor(
        address[] memory _protocolAddresses,
        bytes32[] memory _proposalNames,
        bytes32 _voterBaseLogic,
        bytes32 _pollName,
        bytes32 _pollType,
        uint256 _startTime,
        uint256 _duration
    ) {
        //Make sure _proposalNames length < 255
        require(
            _proposalNames.length <= 255,
            "Proposals must be less than 255"
        );
        protocolAddresses = _protocolAddresses;
        voterBaseLogic = _voterBaseLogic;
        pollName = _pollName;
        pollType = _pollType;
        startTime = _startTime;
        endTime = _startTime + _duration;
        require(_startTime <= _startTime + _duration, "Invalid Times");
        for (uint8 i = 0; i < _proposalNames.length; i++) {
            proposals.push(
                Proposal({name: _proposalNames[i], voteCount: 0, voteWeight: 0})
            );
        }
    }

    function getName() external override view returns (bytes32) {
        return pollName;
    }

    function getPollType() external override view returns (bytes32) {
        return pollType;
    }

    function getVoterBaseLogic() external override view returns (bytes32) {
        return voterBaseLogic;
    }

    function getProtocolAddresses() external override view returns (address[] memory) {
        return protocolAddresses;
    }

    function getStartTime() external override view returns (uint256) {
        return startTime;
    }

    function getEndTime() external override view returns (uint256) {
        return endTime;
    }

    function getProposals() external override view returns (bytes32[] memory) {
        bytes32[] memory proposalNames = new bytes32[](proposals.length);
        for (uint8 index = 0; index < proposals.length; index++) {
            proposalNames[index] = (proposals[index].name);
        }
        return proposalNames;
    }

    function getVoteTally(uint256 _proposalId) external override view returns (uint256) {
        return proposals[_proposalId].voteWeight;
    }

    function getVoteTallies() external override view returns (uint256[] memory) {
        uint256[] memory proposalWeights = new uint256[](proposals.length);
        for (uint8 index = 0; index < proposals.length; index++) {
            proposalWeights[index] = proposals[index].voteWeight;
        }
        return proposalWeights;
    }

    function getVoterCount(uint256 _proposalId)
        external
        override 
        view
        returns (uint256)
    {
        return proposals[_proposalId].voteCount;
    }

    function getVoterCounts() external override view returns (uint256[] memory) {
        uint256[] memory proposalCounts = new uint256[](proposals.length);
        for (uint8 index = 0; index < proposals.length; index++) {
            proposalCounts[index] = proposals[index].voteCount;
        }
        return proposalCounts;
    }

    function winningProposal() external override view returns (uint8) {
        uint8 winningProposalIndex = 0;
        uint256 winningVoteCount = 0;
        for (uint8 p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposalIndex = p;
            }
        }
        return winningProposalIndex;
    }

    function hasPollStarted() public view returns (bool) {
        return (block.timestamp >= startTime);
    }

    //This is to be filled by user before deploying poll.
    //User can't deploy a poll without implementing canVote function.
    //Can't be modified after poll is deployed. Here is a sample.
    //You can also use attributes to set parameters here
    //IERC1261 contract1 = IERC1261(protocolAddresses[0]);
    //IERC1261 contract2 = IERC1261(protocolAddresses[1]);
    //IERC1261 contract3 = IERC1261(protocolAddresses[2]);
    //&& contract2.isCurrentMember(_to) && (contract3.getAttributeByName(_to, 'Country') == 'India')
    //return contract1.isCurrentMember(_to);
    function canVote(address _to) virtual override public view returns (bool);

    function calculateVoteWeight(address _to) virtual override public view returns (uint256);

    function getVoterBaseDenominator() virtual override public view returns (uint256);
}
