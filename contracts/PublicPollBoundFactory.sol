//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./PublicPollBound.sol";

contract PublicPollBoundFactory {

  event PublicPollCreated(
      address indexed _newPoll
  );

  function createPoll(
      address[] memory _protocolAddresses,
      bytes32[] memory _proposalNames,
      bytes32 _voterBaseLogic,
      bytes32 _pollName,
      bytes32 _pollType,
      uint256 _startTime,
      uint256 _duration
  ) external returns (address) {
      PublicPollBound ppb = new PublicPollBound(
          _protocolAddresses,
          _proposalNames,
          _voterBaseLogic,
          _pollName,
          _pollType,
          _startTime,
          _duration
      );
      address newPoll = address(ppb);
      emit PublicPollCreated(newPoll);
      return newPoll;
  }
}
