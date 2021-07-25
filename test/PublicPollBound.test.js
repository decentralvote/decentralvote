const { expect } = require("chai");

describe("PublicPollBound", function () {
  it("Should return the new greeting once it's changed", async function () {

    // Constants
    const zero = ethers.constants.Zero;
    const one = ethers.constants.One;
    const arrayofTwoZeros = [
      zero,
      zero
    ];
    const pollHasntStarted = "Poll hasn't started";
    const hasntVotedYet = "Hasn't yet voted.";

    // Get Signers
    const [owner, secondAddress] = await ethers.getSigners();

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
    const startTime = presentTime + 3;

    // Duration
    const duration = 1000;

    // Deploy the contract
    const PublicPollBoundContract = await ethers.getContractFactory("PublicPollBound");

    const PublicPollBound = await PublicPollBoundContract.deploy(
      protocolAddresses,
      proposalNames,
      voterBaseLogic,
      pollName,
      pollType,
      startTime,
      duration
    );

    await PublicPollBound.deployed();

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

    // Try to vote and expect revert
    await expect(PublicPollBound.vote(zero)).to.be.revertedWith(pollHasntStarted);

    // Try to revoke vote and expect revert
    await expect(PublicPollBound.revokeVote()).to.be.revertedWith(hasntVotedYet);

    // Verify poll has not started
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

    // Try to vote again and verify tried to vote event
    await PublicPollBound.vote(zero);
    await expect(PublicPollBound.vote(zero))
      .to.emit(PublicPollBound, 'TriedToVote')
      .withArgs(owner.address, zero, one);

    // Still same vote total
    expect(await PublicPollBound.getVoterCount(zero)).to.deep.equal(one);
  });
});
