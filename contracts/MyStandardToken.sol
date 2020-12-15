// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyStandardToken is ERC20 {
    constructor (string memory name, string memory symbol) ERC20(name, symbol) public {
        
    }
}