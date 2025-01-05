// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TechBytes is ERC20, Ownable {
    mapping(address => uint256) private _lastTransfer;

    constructor(address initialOwner) 
        ERC20("Tech Bytes", "TBYT") 
        Ownable(initialOwner) 
    {
        uint256 totalSupply = 10_000_000 * 10**decimals(); // 10M tokens
        _mint(msg.sender, totalSupply);
    }
}