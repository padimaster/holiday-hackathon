// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "hardhat/console.sol";

contract Token {
    // Identificación del token
    string public name = "SocialFi Token";
    string public symbol = "SFT";

    // Suministro total inicial
    uint256 public totalSupply = 1000000;

    // Dirección del propietario del contrato
    address public owner;

    // Mapeo para almacenar balances de cada dirección
    mapping(address => uint256) balances;

    // Evento para transferencias de tokens
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    // Constructor para inicializar el contrato
    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    modifier onlyOwner() {

        require(msg.sender == owner, "Caller is not the owner");

        _;

    }

    /**
     * Función para transferir tokens a una dirección.
     * `to` es la dirección del destinatario.
     * `amount` es la cantidad de tokens a enviar.
     */
    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");

        console.log(
            "Transferring from %s to %s %s tokens",
            msg.sender,
            to,
            amount
        );

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
    }

    /**
     * Función para consultar el balance de una dirección específica.
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    /**
     * Obtener la dirección de la wallet asociada al usuario que realizó un post.
     * Aquí asumimos que el backend maneja la lógica de asociación de usuarios y wallets.
     */
    function getWalletOfPoster(address poster) external view returns (address) {
        // En este caso, simplemente devolvemos la dirección del "poster"
        // En una implementación real, se podrían agregar más validaciones.
        return poster;
    }

    /**
     * Obtener la dirección de la wallet que está usando actualmente el contrato.
     */
    function getCurrentWallet() external view returns (address) {
        return msg.sender;
    }

    /**
     * Enviar una cantidad específica de tokens desde el contrato a una dirección.
     * Solo el propietario del contrato puede realizar esta acción.
     */
    function sendTokens(address to, uint256 amount) external {
        require(msg.sender == owner, "Only the owner can send tokens");
        require(balances[owner] >= amount, "Not enough tokens in the contract");

        balances[owner] -= amount;
        balances[to] += amount;

        emit Transfer(owner, to, amount);

        console.log(
            "Owner sent %s tokens to %s",
            amount,
            to
        );
    }
}
