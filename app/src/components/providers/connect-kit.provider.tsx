import { ConnectKitProvider } from "connectkit";
import { getCsrfToken, signIn } from "next-auth/react";
import React from "react";
import { SiweMessage } from "siwe";
import { useAccount, useChainId, useSignMessage } from "wagmi";

export default function CustomConnectKitProvider({
  children,
}: React.PropsWithChildren) {
  const { address } = useAccount();
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();

  return (
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
      onConnect={async () => {
        try {
          const message = new SiweMessage({
            domain: window.location.host,
            address: address,
            statement: "Sign in with Ethereum to the app.",
            uri: window.location.origin,
            version: "1",
            chainId: chainId,
            nonce: await getCsrfToken(),
          });

          const signature = await signMessageAsync({
            message: message.prepareMessage(),
          });

          signIn("credentials", {
            message: JSON.stringify(message),
            redirect: false,
            signature,
            callbackUrl: "/home",
          });

          console.log("Connected");
        } catch (error) {
          window.alert(error);
        }
      }}
      onDisconnect={() => {
        console.log("Disconnected");
      }}
    >
      {children}
    </ConnectKitProvider>
  );
}
