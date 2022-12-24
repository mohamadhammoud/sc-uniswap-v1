// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title Uniswap V1 has only two contract
/// @author Mohamad Hammoud
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.
contract Exchange {
    address public tokenAddress;

    constructor(address _token) {
        require(_token != address(0), "invalid token address");

        tokenAddress = _token;
    }

    /// @notice Adding Liquidity to the Contract
    /// @dev This function accepts either token or ether
    /// @param _tokenAmount The number of tokens from token address.
    function addLiquidity(uint256 _tokenAmount) public payable {
        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(msg.sender, address(this), _tokenAmount);
    }

    /// @notice Swapping Ether to tokens
    /// @dev This function accepts ether as value in tx and minimum amount of tokens as slippage
    /// @param _minTokens Minimum number of tokens wanted from amount of swapped Ether.
    function ethToTokenSwap(uint256 _minTokens) public payable {
        uint256 tokenReserve = getReserve();
        uint256 tokensBought = getAmount(
            msg.value,
            address(this).balance - msg.value,
            tokenReserve
        );

        require(tokensBought >= _minTokens, "insufficient output amount");

        IERC20(tokenAddress).transfer(msg.sender, tokensBought);
    }

    /// @notice Swapping Tokens to Ether
    /// @dev
    /// @param _tokensSold Number of tokens wanted to offer for Ether
    /// @param _minEth Minimum number of Ether wanted from amount of swapped Tokens
    function tokenToEthSwap(uint256 _tokensSold, uint256 _minEth) public {
        uint256 tokenReserve = getReserve();
        uint256 ethBought = getAmount(
            _tokensSold,
            tokenReserve,
            address(this).balance
        );

        require(ethBought >= _minEth, "insufficient output amount");

        IERC20(tokenAddress).transferFrom(
            msg.sender,
            address(this),
            _tokensSold
        );
        payable(msg.sender).transfer(ethBought);
    }

    /// @notice Returns the Balance of the smart contract.
    function getReserve() public view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(address(this));
    }

    /// @notice Swapping Tokens to Ether
    /// @dev
    /// @param _ethSold Number of Ether user want to sold
    /// @return Number of Tokens that user can swap for amount of Ether in _ethSold
    function getTokenAmount(uint256 _ethSold) public view returns (uint256) {
        require(_ethSold > 0, "ethSold is too small");

        uint256 tokenReserve = getReserve();

        return getAmount(_ethSold, address(this).balance, tokenReserve);
    }

    /// @notice Swapping  Ether to Tokens
    /// @dev
    /// @param _tokenSold Number of Tokens user want to sold
    /// @return Number of Ether that user can swap for amount of tokens in _tokenSold
    function getEthAmount(uint256 _tokenSold) public view returns (uint256) {
        require(_tokenSold > 0, "tokenSold is too small");

        uint256 tokenReserve = getReserve();

        return getAmount(_tokenSold, tokenReserve, address(this).balance);
    }

    /// @notice Uniswap V1 formula
    /// @param inputAmount Number of wanted amount user want to sold
    /// @param inputReserve Balance of smart contract for pair1
    /// @param outputReserve Balance of of smart contract pair2
    /// @return Amount that can be bought by the input amount
    function getAmount(
        uint256 inputAmount,
        uint256 inputReserve,
        uint256 outputReserve
    ) private pure returns (uint256) {
        require(inputReserve > 0 && outputReserve > 0, "invalid reserves");

        return (inputAmount * outputReserve) / (inputReserve + inputAmount);
    }
}