const { expect } = require("chai");

describe("DecentralPoll", function () {
  it("Should return the new greeting once it's changed", async function () {
    const DecentralPollContract = await ethers.getContractFactory("DecentralPoll");

    // console.log(ethers);
    // const DecentralPoll = await DecentralPollContract.deploy(
    //   [protocol1Contract.address, protocol2Contract.address, protocol3Contract.address],
    //   ["0x68656c6c6f", "0x776f726c64"],
    //   "0x57616e636861696e",
    //   "0x41646d696e20456c656374696f6e20466f722032303138",
    //   "0x4f6e6520506572736f6e204f6e6520566f7465",
    //   startTime,
    //   "1000000"
    // );
    // await DecentralPoll.deployed();

    

    // expect(await DecentralPoll.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
