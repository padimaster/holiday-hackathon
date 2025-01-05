'use client'

import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { chains } from "@lens-network/sdk/viem";
import ContractABI from "../../lib/lens/abis/Username.json";

export function useUsername() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  
  const assignUsername = async () => {
      const data = await writeContractAsync({
        chainId: chains.testnet.id,
        address: "0x6Cc71E78e25eBF6A2525CadC1fc628B42AE4138f",
        functionName: "assignUsername",
        abi: ContractABI,
        args: [
          address ? [address] : undefined,
          "0xarcano",
          [],
          []
        ]
      });
      return data;
  };

  const {data: username } = useReadContract({
    chainId: chains.testnet.id,
    address: "0x6Cc71E78e25eBF6A2525CadC1fc628B42AE4138f",
    functionName: "usernameOf",
    abi: ContractABI,
    args: address ? [address] : undefined,
  });

  return {
    assignUsername,
    username
  };
}