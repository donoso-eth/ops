// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.0;

import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

abstract contract Gelatofied {
    address public constant ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    address payable public immutable gelato;

    constructor(address payable _gelato) {
        gelato = _gelato;
    }

    modifier gelatofy(uint256 _amount, address _paymentToken) {
        require(msg.sender == gelato, "Gelatofied: Only gelato");
        _;
        _transfer(gelato, _paymentToken, _amount);
    }

    function _transfer(
        address payable _to,
        address _paymentToken,
        uint256 _amount
    ) internal {
        if (_paymentToken == ETH) {
            (bool success, ) = _to.call{value: _amount}("");
            require(success, "Gelatofied: Gelato fee failed");
        } else {
            SafeERC20.safeTransfer(IERC20(_paymentToken), _to, _amount);
        }
    }
}
