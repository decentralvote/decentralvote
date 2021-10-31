const { expect } = require("chai");
const { advanceBlocks } = require("./helpers");

describe("PublicPollBound", () => {

  // Constants
  const zero = ethers.constants.Zero;
  const one = ethers.constants.One;
  const arrayofTwoZeros = [
    zero,
    zero
  ];
  let pollHasntStarted = "Poll hasn't started";
  let hasntVotedYet = "Hasn't yet voted.";

  // Get Signers
  let owner, secondAddress;

  // Membership Protocol Addresses
  let protocolAddresses = [];

  // Proposal Name Array
  let proposalNames = [
    ethers.utils.formatBytes32String("DV Proposal 1"),
    ethers.utils.formatBytes32String("DV Proposal 2")
  ];

  // Voter Base Logic
  let voterBaseLogic = ethers.utils.formatBytes32String("DV Voter Base Logic");

  // Poll Name
  let pollName = ethers.utils.formatBytes32String("DV Poll Name");

  // Poll Type
  let pollType = ethers.utils.formatBytes32String("DV Poll Type");

  // Start Time
  let presentTime, startTime;

  // Duration
  let duration = 1000;

  // Contract variables
  let PublicPollBoundContract, PublicPollBound;

  beforeEach(async () => {
    // Start Time
    presentTime = (await ethers.provider.getBlock()).timestamp;
    startTime = presentTime + 3;

    // Get Signers
    [owner, secondAddress] = await ethers.getSigners();

    // Deploy the contract
    PublicPollBoundContract = await ethers.getContractFactory("PublicPollBound");

    PublicPollBound = await PublicPollBoundContract.deploy(
      protocolAddresses,
      proposalNames,
      voterBaseLogic,
      pollName,
      pollType,
      startTime,
      duration
    );

    await PublicPollBound.deployed();
  });

  it("should return the correct values from instantiation", async () => {
    // Verify the various properties from construction
    expect(await PublicPollBound.getProposals()).to.deep.equal(proposalNames);
    expect(await PublicPollBound.getVoterBaseLogic()).to.equal(voterBaseLogic);
    expect(await PublicPollBound.getName()).to.equal(pollName);
    expect(await PublicPollBound.getPollType()).to.equal(pollType);
    expect(await PublicPollBound.getStartTime()).to.equal(startTime);
    expect(await PublicPollBound.getEndTime()).to.equal(startTime + duration);

    // Verify any user is valid voter with protocol-less allowance in contract
    expect(await PublicPollBound.canVote(owner.address)).to.equal(true);
    expect(await PublicPollBound.canVote(secondAddress.address)).to.equal(true);

    // Verify poll has not started
    expect(await PublicPollBound.hasPollStarted()).to.equal(false);

    // Verify empty vote tally
    expect(await PublicPollBound.getVoteTallies()).to.deep.equal(arrayofTwoZeros);

    // Verify zero voter count
    expect(await PublicPollBound.getVoterCounts()).to.deep.equal(arrayofTwoZeros);
  });

  it("should revert when the poll has not started", async () => {
    // Try to vote and expect revert
    await expect(PublicPollBound.vote(zero)).to.be.revertedWith(pollHasntStarted);
  });

  it("should revert a revoke when the poll hasn't started", async () => {
    // Try to revoke vote and expect revert
    await expect(PublicPollBound.revokeVote()).to.be.revertedWith(pollHasntStarted);
  });

  it("should process a vote and emit an event as expected", async () => {
    // Advance the blocks
    await advanceBlocks(3);

    // Verify poll has started
    expect(await PublicPollBound.hasPollStarted()).to.equal(true);

    // Vote for first proposal and verify cast vote event
    await expect(PublicPollBound.vote(zero))
      .to.emit(PublicPollBound, 'CastVote')
      .withArgs(owner.address, zero, one);

    // Verify new voter count
    expect(await PublicPollBound.getVoterCount(zero)).to.deep.equal(one);
    expect(await PublicPollBound.getVoterCount(one)).to.deep.equal(zero);

    // Verify winning proposal
    expect(await PublicPollBound.winningProposal()).to.deep.equal(zero);
  });

  it("should process a repeat vote and emit an event as expected", async () => {
    // Advance the blocks
    await advanceBlocks(3);

    // Try to vote again and verify tried to vote event
    await PublicPollBound.vote(zero);
    await expect(PublicPollBound.vote(zero))
      .to.emit(PublicPollBound, 'TriedToVote')
      .withArgs(owner.address, zero, one);

    // Still same vote total
    expect(await PublicPollBound.getVoterCount(zero)).to.deep.equal(one);
  });
});
