import { expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "ethers";

describe("Start Point", async function () {
  let token: any;
  let exchange: any;

  let owner: any;

  beforeEach("Deployments", async function () {
    [owner] = await ethers.getSigners();
    const tokenFactory = await ethers.getContractFactory("Token");
    const exchangeFactory = await ethers.getContractFactory("Exchange");

    token = await tokenFactory.deploy("USDC", "USDC", utils.parseEther("2000"));

    exchange = await exchangeFactory.deploy(token.address);
  });

  describe("addLiquidity", async function () {
    it("adds liquidity and swaps", async function () {
      await token.approve(exchange.address, utils.parseEther("2000"));

      let ownerBalance = await getBalance(owner.address);
      let exchangeBalance = await getBalance(exchange.address);

      let tokenOwnerBalance = await token.balanceOf(owner.address);
      let tokenExchangeBalance = await token.balanceOf(exchange.address);

      console.log(
        "Token Balance of Owner before adding liquidity",
        utils.formatEther(tokenOwnerBalance)
      );

      console.log(
        "Token Balance of exchange before adding liquidity",
        utils.formatEther(tokenExchangeBalance)
      );
      console.log(
        "Ether Balance of Owner before adding liquidity",
        utils.formatEther(ownerBalance)
      );
      console.log(
        "Ether Balance of exchange before adding liquidity",
        utils.formatEther(exchangeBalance)
      );

      console.log(
        "-------------------------------------------------------------------------"
      );
      console.log(
        "-------------------------------------------------------------------------"
      );

      await exchange.addLiquidity(utils.parseEther("2000"), {
        value: utils.parseEther("1000"),
      });

      tokenOwnerBalance = await token.balanceOf(owner.address);
      tokenExchangeBalance = await token.balanceOf(exchange.address);

      console.log(
        "Token Balance of Owner after adding liquidity",
        utils.formatEther(tokenOwnerBalance)
      );

      console.log(
        "Token Balance of exchange after adding liquidity",
        utils.formatEther(tokenExchangeBalance)
      );

      ownerBalance = await getBalance(owner.address);
      console.log(
        "Ether Balance of Owner before adding liquidity",
        utils.formatEther(ownerBalance)
      );

      exchangeBalance = await getBalance(exchange.address);
      console.log(
        "Ether Balance of Exchange before adding liquidity",
        utils.formatEther(exchangeBalance)
      );

      expect(await getBalance(exchange.address)).to.equal(
        utils.parseEther("1000")
      );

      expect(await exchange.getReserve()).to.equal(utils.parseEther("2000"));

      console.log(
        "-------------------------------------------------------------------------"
      );
      console.log(
        "-------------------------------------------------------------------------"
      );
      console.log(
        "Owner want to swap 10 Ethers to Tokens so he ask the contract for amount of tokens for 10 ethers"
      );

      let ethPerToken = await exchange.getTokenAmount(utils.parseEther("10"));
      console.log(
        "Amount of Tokens for 10 Ethers are: ",
        utils.formatEther(ethPerToken.toString())
      );
      console.log("Okay Let's swap 10 Ethers to Tokens");

      console.log(
        "-------------------------------------------------------------------------"
      );
      console.log(
        "-------------------------------------------------------------------------"
      );

      await exchange.ethToTokenSwap(utils.parseEther("10"), {
        value: utils.parseEther("10"),
      });

      tokenOwnerBalance = await token.balanceOf(owner.address);
      tokenExchangeBalance = await token.balanceOf(exchange.address);

      console.log(
        "Token Balance of Owner after after Swap",
        utils.formatEther(tokenOwnerBalance)
      );

      console.log(
        "Token Balance of exchange after after Swap",
        utils.formatEther(tokenExchangeBalance)
      );

      ownerBalance = await getBalance(owner.address);
      console.log(
        "Ether Balance of Owner after Swap",
        utils.formatEther(ownerBalance)
      );

      exchangeBalance = await getBalance(exchange.address);
      console.log(
        "Ether Balance of Exchange after Swap",
        utils.formatEther(exchangeBalance)
      );
    });

    // it("Should call the tokenC contract to grant roles and swap 1:2", async function () {});
  });
});

async function getBalance(address: any) {
  // console.log(ethers.getDefaultProvider().getBalance(address));
  const balance = await ethers.provider.getBalance(address);
  return balance.toString();
}
