const { expect } = require("chai");

describe("DecentralPoll", function () {
  it("Should return the new greeting once it's changed", async function () {

    // Provider and utils example

    // let bal = await ethers.provider.getBalance(EtherGameContract.address);
    // expect(ethers.utils.formatEther(bal)).to.equal("1.0");

    // Args

    // address[] _protocolAddresses,
    // bytes32[] _proposalNames,
    // bytes32 _voterBaseLogic,
    // bytes32 _pollName,
    // bytes32 _pollType,
    // uint _startTime,
    // uint _duration

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
    const startTime = presentTime + 1000;

    // Duration
    const duration = 1000000;

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

    // console.log(DecentralPoll);

    

    expect(await DecentralPoll.pollName()).to.equal(pollName);

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
