'use client'

import { useAccount, useWriteContract } from "wagmi";
import { chains } from "@lens-network/sdk/viem";
import LensFactoryABI from "../lib/lens/abis/LensFactory.json";

export function useUsername() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  
  const createUsername = async () => {

    if (!isConnecting && isDisconnected) {
      const data = writeContractAsync({
        chainId: chains.testnet.id,
        address: "0xbD7EAFA4Df7EC8DDC8Ca50Fbc29659B10FDD1a3e",
        functionName: "deployUsername",
        abi: LensFactoryABI,
        args: [
          "techpills.xyz",
          "",
          address,
          [],
          [],
          [],
          "pr1",
          "pr1"
        ]
      });
      console.log(data);
      return data;
    }
  };

  return {
    createUsername
  };
}