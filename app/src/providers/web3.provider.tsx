"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { chains } from "@lens-network/sdk/viem";
import { ReactNode } from "react";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [chains.testnet],
    transports: {
      // RPC URL for each chain
      [chains.testnet.id]: http(chains.testnet.rpcUrls.default.http[0]),
    },

    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    // Required App Info
    appName: "COMM",

    // Optional App Info
    appDescription: "Social Learning Platform",
    appUrl: "", // your app's url
    appIcon: "", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={{
            "--ck-connectbutton-background": "#0085ff",
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
