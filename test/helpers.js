module.exports =  {
  advanceBlocks: async (numBlocks = 1) => {
    for (let i = 0; i < numBlocks; i++)
      await ethers.provider.send("evm_mine", []);
  }
}
