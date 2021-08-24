const { expect } = require("chai");
const PublicPollBound =  require('../src/artifacts/contracts/PublicPollBound.sol/PublicPollBound.json');

describe("PublicPollBoundFactory", function () {
  it("should create a new instance of a poll with the given inputs", async function () {

    const defaultProvider = ethers.providers.getDefaultProvider();

    const [owner] = await ethers.getSigners();

    // Membership Protocol Addresses
    const protocolAddresses = [];

    // Proposal Name Array
    const proposalNames = [
      ethers.utils.formatBytes32String("DV Proposal 1"),
      ethers.utils.formatBytes32String("DV Proposal 2")
    ];

    // Voter Base Logic
    const voterBaseLogic = ethers.utils.formatBytes32String("PublicPollBound");

    // Poll Name
    const pollName = ethers.utils.formatBytes32String("DV Poll Name");

    // Poll Type
    const pollType = ethers.utils.formatBytes32String("PublicPollBound");

    // Start Time
    const presentTime = (await ethers.provider.getBlock()).timestamp;
    const startTime = presentTime + 3;

    // Duration
    const duration = 1000;

    // Deploy the contract
    const PublicPollBoundFactoryContract = await ethers.getContractFactory("PublicPollBoundFactory");

    const PublicPollBoundFactory = await PublicPollBoundFactoryContract.deploy();

    await PublicPollBoundFactory.deployed();

    let pollTxn = await PublicPollBoundFactory.createPoll(
      protocolAddresses,
      proposalNames,
      voterBaseLogic,
      pollName,
      pollType,
      startTime,
      duration
    );

    await pollTxn.wait();

    // Get Address
    let pollCreatedEvent = PublicPollBoundFactory.filters.PublicPollCreated();
    // console.log(pollCreatedEvent, pollTxn, await defaultProvider.getTransaction(pollCreatedEvent.topics[0]));
    console.log(
      await defaultProvider.getLogs({
        address: PublicPollBoundFactory.address
      })
    );
    let pollAddress = pollCreatedEvent.topics[0];

    // const pollContract = new ethers.Contract(pollAddress, PublicPollBound.abi, ethers.provider);

    // console.log(PublicPollBoundFactory.address, pollAddress);

    // Verify the various properties from construction
    // expect(await pollContract.getProposals()).to.deep.equal(proposalNames);
    // expect(await pollContract.getVoterBaseLogic()).to.equal(voterBaseLogic);
    // expect(await pollContract.getName()).to.equal(pollName);
    // expect(await pollContract.getPollType()).to.equal(pollType);
    // expect(await pollContract.getStartTime()).to.equal(startTime);
    // expect(await pollContract.getEndTime()).to.equal(startTime + duration);
  });
});
