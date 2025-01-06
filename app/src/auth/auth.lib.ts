import { SiweMessage } from "siwe";
import { getCsrfToken, signIn } from "next-auth/react";
import { Address } from "viem";

export async function authenticateWithWeb3(address: Address) {
  try {
    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in with Ethereum to Tech Pills",
      uri: window.location.origin,
      version: "1",
      chainId: 1,
      nonce: await getCsrfToken(),
    });

    const signature = await signMessageAsync({
        message: message.prepareMessage()
      })
    const response = await signIn("web3", {
      message: JSON.stringify(message),
      signature,
      redirect: false,
    });

    return response;
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
}
