//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

import "./OnePersonOneVoteBound.sol";

contract DecentralPoll is OnePersonOneVoteBound {
    /* solhint-disable no-empty-blocks */
    constructor(
        address[] memory _protocolAddresses,
        bytes32[] memory _proposalNames,
        bytes32 _voterBaseLogic,
        bytes32 _pollName,
        bytes32 _pollType,
        uint256 _startTime,
        uint256 _duration
    )
        OnePersonOneVoteBound(
            _protocolAddresses,
            _proposalNames,
            _voterBaseLogic,
            _pollName,
            _pollType,
            _startTime,
            _duration
        )
    {}
    /* solhint-enable no-empty-blocks */

    function canVote(address _to) public override pure returns (bool) {
        _to;
        return true;

        // IERC1261 contract1 = IERC1261(protocolAddresses[0]);
        // IERC1261 contract2 = IERC1261(protocolAddresses[1]);
        // IERC1261 contract3 = IERC1261(protocolAddresses[2]);
        // return (contract1.isCurrentMember(_to) || contract2.isCurrentMember(_to)) && (
        //     contract3.isCurrentMember(_to) && contract3.getAttributeByIndex(_to, 0) == 0
        // );
    }

    function getVoterBaseDenominator() public override pure returns (uint256) {
        uint256 totalMemberCount = 1;
        return totalMemberCount;
    }
}
