//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./BasePollBound.sol";

abstract contract OnePersonOneVoteBound is BasePollBound {
    constructor(
        address[] memory _protocolAddresses,
        bytes32[] memory _proposalNames,
        bytes32 _voterBaseLogic,
        bytes32 _pollName,
        bytes32 _pollType,
        uint256 _startTime,
        uint256 _duration
    )
        BasePollBound(
            _protocolAddresses,
            _proposalNames,
            _voterBaseLogic,
            _pollName,
            _pollType,
            _startTime,
            _duration
        )
    {}

    function vote(uint8 _proposal) external override checkTime {
        Voter storage sender = voters[msg.sender];
        uint256 voteWeight = calculateVoteWeight(msg.sender);

        if (
            canVote(msg.sender) && !sender.voted && _proposal < proposals.length
        ) {
            sender.voted = true;
            sender.vote = _proposal;
            sender.weight = voteWeight;
            proposals[_proposal].voteWeight += sender.weight;
            proposals[_proposal].voteCount += 1;
            emit CastVote(msg.sender, _proposal, sender.weight);
        } else {
            emit TriedToVote(msg.sender, _proposal, voteWeight);
        }
    }

    function revokeVote() external override isValidVoter checkTime {
        Voter storage sender = voters[msg.sender];
        require(sender.voted, "Hasn't yet voted.");
        uint8 votedProposal = sender.vote;
        uint256 voteWeight = sender.weight;
        sender.voted = false;
        proposals[sender.vote].voteWeight -= sender.weight;
        proposals[sender.vote].voteCount -= 1;
        sender.vote = 0;
        sender.weight = 0;
        emit RevokedVote(msg.sender, votedProposal, voteWeight);
    }

    // solhint-disable-next-line
    function calculateVoteWeight(address _to) public override pure returns (uint256) {
        _to;
        return 1;
    }
}
