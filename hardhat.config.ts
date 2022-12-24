import { HardhatUserConfig } from "hardhat/config";
require("dotenv").config();
import "@nomicfoundation/hardhat-toolbox";

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";

const { PRIVATE_KEY, PUBLIC_KEY, ALCHEMY_KEY, ETHERSCAN_API_KEY } = process.env;

// const config: HardhatUserConfig = {
const config = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/4Wyho29rDaYnNPbEAUR-5GY2ekvRsrAh`,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
  etherscan: { apiKey: `${ETHERSCAN_API_KEY}` },
};

export default config;
