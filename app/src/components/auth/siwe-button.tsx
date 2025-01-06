import { useSIWE, useModal, SIWESession } from "connectkit";
import { useAccount } from "wagmi";

const CustomSIWEButton = () => {
  const { setOpen } = useModal();
  const { isConnected } = useAccount();

  const { data, isReady, isRejected, isLoading, isSignedIn, signOut, signIn } =
    useSIWE({
      onSignIn: (session?: SIWESession) => {
        return session;
      },
      onSignOut: () => {
        return null;
      },
    });

  const handleSignIn = async () => {
    await signIn()?.then((session?: SIWESession) => {
      console.log("Handle Sign in", session);
    });
  };

  const handleSignOut = async () => {
    await signOut()?.then(() => {
      console.log("handle signout");
    });
  };

  /** Wallet is connected and signed in */
  if (isSignedIn) {
    return (
      <>
        <div>Address: {data?.address}</div>
        <div>ChainId: {data?.chainId}</div>
        <button onClick={handleSignOut}>Sign Out</button>
      </>
    );
  }

  /** Wallet is connected, but not signed in */
  if (isConnected) {
    return (
      <>
        <button onClick={handleSignIn} disabled={isLoading}>
          {isRejected // User Rejected
            ? "Try Again"
            : isLoading // Waiting for signing request
            ? "Awaiting request..."
            : // Waiting for interaction
              "Sign In"}
        </button>
      </>
    );
  }

  /** A wallet needs to be connected first */
  return (
    <>
      <button onClick={() => setOpen(true)}>Connect Wallet</button>
    </>
  );
};

export default CustomSIWEButton;
