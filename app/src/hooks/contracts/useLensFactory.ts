'use client'

import { useAccount, useWriteContract } from "wagmi";
import { chains } from "@lens-network/sdk/viem";
import ContractABI from "../../lib/lens/abis/LensFactory.json";

export function useLensFactory() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  
  const createUsername = async () => {
      const data = await writeContractAsync({
        chainId: chains.testnet.id,
        address: "0xbD7EAFA4Df7EC8DDC8Ca50Fbc29659B10FDD1a3e",
        functionName: "deployUsername",
        abi: ContractABI,
        args: [
          "techpills.xyz",
          "",
          address,
          [],
          [],
          [],
          "pr3",
          "pr3"
        ]
      });
      console.log(data)
      return data;
  };

  return {
    createUsername
  };
}