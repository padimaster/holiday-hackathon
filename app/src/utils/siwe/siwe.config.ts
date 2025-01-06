import { SIWEConfig } from "connectkit";
import { SiweMessage } from "siwe";

export const siweConfig: SIWEConfig = {
  getNonce: async () =>
    fetch("/api/siwe/nonce")
      .then((res) => res.json())
      .then((data) => data.nonce),
  createMessage: ({
    nonce,
    address,
    chainId,
  }: {
    nonce: string;
    address: string;
    chainId: number;
  }) =>
    new SiweMessage({
      version: "1",
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId,
      nonce,
      // Human-readable ASCII assertion that the user will sign, and it must not contain `\n`.
      statement: "Sign in With Ethereum.",
    }).prepareMessage(),
  verifyMessage: async ({ message, signature }) =>
    fetch("/api/siwe/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, signature }),
    }).then((res) => res.ok),
  getSession: async () =>
    fetch("/api/siwe/session").then((res) => (res.ok ? res.json() : null)),
  signOut: async () => fetch("/api/siwe/logout").then((res) => res.ok),
};
