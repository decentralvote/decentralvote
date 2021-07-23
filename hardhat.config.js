require('dotenv').config();
require("@nomiclabs/hardhat-waffle");

const { ALCHEMY_API_KEY_ROPSTEN, ALCHEMY_API_KEY_RINKEBY, PRIVATE_KEY } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: ALCHEMY_API_KEY_ROPSTEN,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    rinkeby: {
      url: ALCHEMY_API_KEY_RINKEBY,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
