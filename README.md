# Sample Hardhat Project

As of June 2021, three versions of Uniswap have been launched.

First version was launched in November 2018 and it allowed only swaps between ether and a token. Chained swaps were also possible to allow token-token swaps.

V2 was launched in March 2020 and it was a huge improvement of V1 that allowed direct swaps between any ERC20 tokens, as well as chained swaps between any pairs.

V3 was launched in May 2021 and it significantly improved capital efficiency, which allowed liquidity providers to remove a bigger portion of their liquidity from pools and still keep getting the same rewards (or squeeze the capital in smaller price ranges and get up to 4000x of profits).

In this series, we’ll dig into each of the versions and will try to build simplified copies of each of them from scratch.

This Project specifically focuses on Uniswap V1 to respect the chronological order and better understand how previous solutions were improved.

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

npm i

npx hardhat compile

npx hardhat test
