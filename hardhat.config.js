const { infuraProjectId, rinkebyAccountKey, etherscanApiKey } = require('./secrets.json');
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const [deployer] = await ethers.getSigners();

    let balance = await deployer.getBalance()
    console.log(`Address: ${deployer.address}`);
    console.log(`Balance: ${balance.toString()} ETH`);

});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
      accounts: [`0x${rinkebyAccountKey}`]
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${infuraProjectId}`,
      accounts: [`0x${rinkebyAccountKey}`]
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${infuraProjectId}`,
      accounts: [`0x${rinkebyAccountKey}`]
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${infuraProjectId}`,
      accounts: [`0x${rinkebyAccountKey}`]
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: etherscanApiKey
  },
};
