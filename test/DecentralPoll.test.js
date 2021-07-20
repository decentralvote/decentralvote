const { expect } = require("chai");

describe("DecentralPoll", function () {
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

    // console.log(
    //   "To bytes (Hello World):",
    //   ethers.utils.formatBytes32String("Hello World"),
    // );

    // console.log(
    //   "From bytes ():",
    //   ethers.utils.parseBytes32String("0x48656c6c6f20576f726c64000000000000000000000000000000000000000000")
    // );

    // console.log(
    //   "Hex Padded (0x68656c6c6f):",
    //   ethers.utils.hexZeroPad("0x68656c6c6f", 32),
    // );

    // console.log(
    //   "Proposal 1",
    //   ethers.utils.parseBytes32String(
    //     "0x68656c6c6f000000000000000000000000000000000000000000000000000000"
    //   ),
    //   "\nProposal 2",
    //   ethers.utils.parseBytes32String(
    //     "0x776f726c64000000000000000000000000000000000000000000000000000000"
    //   ),
    //   "\nvoterBaseLogic",
    //   ethers.utils.parseBytes32String(
    //     "0x57616e636861696e000000000000000000000000000000000000000000000000"
    //   ),
    //   "\npollName",
    //   ethers.utils.parseBytes32String(
    //     "0x41646d696e20456c656374696f6e20466f722032303138000000000000000000"
    //   ),
    //   "\npollType",
    //   ethers.utils.parseBytes32String(
    //     "0x4f6e6520506572736f6e204f6e6520566f746500000000000000000000000000"
    //   )
    // );

    // Deploy the contract
    const DecentralPollContract = await ethers.getContractFactory("DecentralPoll");

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

    // Verify the various properties from construction
    expect(await DecentralPoll.getProposals()).to.deep.equal(proposalNames);
    expect(await DecentralPoll.getVoterBaseLogic()).to.equal(voterBaseLogic);
    expect(await DecentralPoll.getName()).to.equal(pollName);
    expect(await DecentralPoll.getPollType()).to.equal(pollType);
    expect(await DecentralPoll.getStartTime()).to.equal(startTime);
    expect(await DecentralPoll.getEndTime()).to.equal(startTime + duration);

    // Verify any user is valid voter with protocol-less allowance in contract
    expect(await DecentralPoll.canVote(owner.address)).to.equal(true);
    expect(await DecentralPoll.canVote(secondAddress.address)).to.equal(true);

    // Verify poll has not started
    expect(await DecentralPoll.hasPollStarted()).to.equal(false);

    // Verify empty vote tally
    expect(await DecentralPoll.getVoteTallies()).to.deep.equal(arrayofTwoZeros);

    // Verify zero voter count
    expect(await DecentralPoll.getVoterCounts()).to.deep.equal(arrayofTwoZeros);

    // Try to vote and expect revert
    await expect(DecentralPoll.vote(zero)).to.be.revertedWith(pollHasntStarted);

    // Try to revoke vote and expect revert
    await expect(DecentralPoll.revokeVote()).to.be.revertedWith(hasntVotedYet);

    // Verify poll has not started
    expect(await DecentralPoll.hasPollStarted()).to.equal(true);

    // Vote for first proposal and verify cast vote event
    await expect(DecentralPoll.vote(zero))
      .to.emit(DecentralPoll, 'CastVote')
      .withArgs(owner.address, zero, one);

    // Verify new voter count
    expect(await DecentralPoll.getVoterCount(zero)).to.deep.equal(one);
    expect(await DecentralPoll.getVoterCount(one)).to.deep.equal(zero);

    // Verify winning proposal
    expect(await DecentralPoll.winningProposal()).to.deep.equal(zero);

    // Try to vote again and verify tried to vote event
    await DecentralPoll.vote(zero);
    await expect(DecentralPoll.vote(zero))
      .to.emit(DecentralPoll, 'TriedToVote')
      .withArgs(owner.address, zero, one);

    // Still same vote total
    expect(await DecentralPoll.getVoterCount(zero)).to.deep.equal(one);

    // expect(await DecentralPoll.getVoterCount(zero)).to.deep.equal(one);

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
