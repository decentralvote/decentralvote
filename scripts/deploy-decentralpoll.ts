import {ethers} from "ethers";

const hardhat = require("hardhat");

async function main() {
  // Membership Protocol Addresses
  const protocolAddresses: string[] = [];

  // Proposal Name Array
  const proposalNames = [
    ethers.utils.formatBytes32String("Obama"),
    ethers.utils.formatBytes32String("Romney")
  ];

  // Voter Base Logic
  const voterBaseLogic = ethers.utils.formatBytes32String("National Voting");

  // Poll Name
  const pollName = ethers.utils.formatBytes32String("2012 US Presidential Election");

  // Poll Type
  const pollType = ethers.utils.formatBytes32String("One Person One Vote");

  // Start Time
  // await ethers.provider.send("evm_mine", []);
  const presentTime = (await ethers.provider.getBlock()).timestamp;
  const startTime = presentTime + 60;

  // Duration
  const duration = 60 * 60 * 24 * 5;
  // We get the contract to deploy
  const DecentralPollContract = await hardhat.ethers.getContractFactory("DecentralPoll");

  const DecentralPoll = await DecentralPollContract.deploy(
    protocolAddresses,
    proposalNames,
    voterBaseLogic,
    pollName,
    pollType,
    startTime,
    duration
  );

  await DecentralPoll.deployed();

  console.log("DecentralPoll deployed to:", DecentralPoll.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
