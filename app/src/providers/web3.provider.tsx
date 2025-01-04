"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { chains } from "@lens-network/sdk/viem";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter()
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={{
            "--ck-connectbutton-font-size": "15px",
            "--ck-connectbutton-color": "#ffffff",
            "--ck-connectbutton-background": "#8000ff",
            "--ck-connectbutton-background-secondary": "#FFFFFF",
            "--ck-connectbutton-border-radius": "16px",
            "--ck-connectbutton-box-shadow": "0 0 0 0 #ffffff",
            "--ck-connectbutton-hover-color": "#373737",
            "--ck-connectbutton-hover-background": "#F0F2F5",
            "--ck-connectbutton-hover-box-shadow": "0 0 0 0 #ffffff",
            "--ck-connectbutton-active-color": "#373737",
            "--ck-connectbutton-active-background": "#EAECF1",
            "--ck-connectbutton-active-box-shadow": "0 0 0 0 #ffffff",
            "--ck-connectbutton-balance-color": "#373737",
            "--ck-connectbutton-balance-background": "#fff",
            "--ck-connectbutton-balance-box-shadow": "inset 0 0 0 1px #F6F7F9",
            "--ck-connectbutton-balance-hover-background": "#F6F7F9",
            "--ck-connectbutton-balance-hover-box-shadow":
              "inset 0 0 0 1px #F0F2F5",
            "--ck-connectbutton-balance-active-background": "#F0F2F5",
            "--ck-connectbutton-balance-active-box-shadow":
              "inset 0 0 0 1px #EAECF1",
          }}
          onConnect={() => {
            router.push('/home')
            console.log("Connected");
          }}
          onDisconnect={() => {
            router.push('/login')
            console.log("Disconnected");
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
