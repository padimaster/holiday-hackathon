import * as hre from "hardhat";
import dotenv from "dotenv";
import { chains } from "@lens-network/sdk/viem";
import { createPublicClient, createWalletClient, http, Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { eip712WalletActions } from "viem/zksync";

dotenv.config();

export const getPublicClient = () => {
  console.log(chains.testnet);
  return createPublicClient({
    chain: chains.testnet,
    transport: http(),
  });
}
  

export const getAccount = () =>
  privateKeyToAccount(`0x${process.env.PRIVATE_KEY}` as Hex);

export const getWallet = () =>
  createWalletClient({
    account: getAccount(),
    chain: chains.testnet,
    transport: http(),
  }).extend(eip712WalletActions());
