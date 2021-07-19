const hre = require("hardhat");

async function main() {
  // Membership Protocol Addresses
  const protocolAddresses = [];

  // Proposal Name Array
  const proposalNames = [
    ethers.utils.formatBytes32String("DV Proposal 1"),
    ethers.utils.formatBytes32String("DV Proposal 2")
  ];

  // Voter Base Logic
  const voterBaseLogic = ethers.utils.formatBytes32String("DV Voter Base Logic");

  // Poll Name
  const pollName = ethers.utils.formatBytes32String("DV Poll Name");

  // Poll Type
  const pollType = ethers.utils.formatBytes32String("DV Poll Type");

  // Start Time
  const presentTime = (await ethers.provider.getBlock()).timestamp;
  const startTime = presentTime + 60;

  // Duration
  const duration = 1000;
  // We get the contract to deploy
  const DecentralPollContract = await hre.ethers.getContractFactory("DecentralPoll");

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
