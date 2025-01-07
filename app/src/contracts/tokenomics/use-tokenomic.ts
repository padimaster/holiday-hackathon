'use client';

import { useCallback, useMemo } from 'react';
import { Abi, Address, Hash, Hex, formatEther, parseEther } from 'viem';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { contractAddresses } from '../utils';
import TipManagerContract from '../abis/TipManager.json';
import TokenManagerContract from '../abis/TokenManager.json';
import TechBitesContract from '../abis/TechBites.json';

interface TipTransaction {
  creator: Address;
  amount: bigint;
  postId: string;
}

export function useContractService() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const ensureWalletConnected = useCallback(() => {
    if (!address || !walletClient) {
      throw new Error('Wallet not connected');
    }
  }, [address, walletClient]);

  const approveTokenSpending = useCallback(
    async (amount: bigint): Promise<Hash> => {
      try {
        ensureWalletConnected();

        if (!walletClient) throw new Error('Wallet client not initialized');
        if (!publicClient) throw new Error('Public client not initialized');

        const data = {
          account: `${address}` as Hex,
          address: `${contractAddresses.techBites}` as Hex,
          abi: TechBitesContract.abi as Abi,
          functionName: 'approve',
          args: [`${contractAddresses.tipManager}` as Hex, amount],
        };
        const { request } = await publicClient.simulateContract(data);

        return await walletClient.writeContract(request);
      } catch (error) {
        throw new Error('Failed to approve token spending');
      }
    },
    [address, publicClient, ensureWalletConnected, walletClient]
  );

  const sendTip = useCallback(
    async (tipData: TipTransaction): Promise<Hash> => {
      try {
        ensureWalletConnected();
        console.log('Address tip:', address);
        await approveTokenSpending(tipData.amount);

        if (!publicClient) throw new Error('Public client not initialized');

        console.log('Sending tip:', {
          amount: tipData.amount,
          tipManager: contractAddresses.tipManager,
        });

        const { request } = await publicClient.simulateContract({
          account: address as Hex,
          address: contractAddresses.tipManager as Hex,
          abi: TipManagerContract.abi,
          functionName: 'tip',
          args: [tipData.creator as Hex, tipData.amount, tipData.postId],
        });

        if (!walletClient)
          throw new Error('walletClient client not initialized');
        return await walletClient.writeContract(request);
      } catch (error) {
        console.error('Error sending tip:', error);
        throw new Error(
          `Failed to send tip: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    },
    [
      address,
      ensureWalletConnected,
      publicClient,
      walletClient,
      approveTokenSpending,
    ]
  );

  return useMemo(
    () => ({
      sendTip,
    }),
    [sendTip]
  );
}
