'use client';

import { ConnectKitButton, SIWESession, useSIWE } from 'connectkit';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Loader2, MoreHorizontal } from 'lucide-react';
import {
  useSession,
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from 'next-auth/react';

export const AuthButton = () => {
  const { data: session } = useSession();

  const {
    data,
    isSignedIn,
    isLoading,
    isRejected,
    isError,
    signIn: siweSignIn,
    signOut: siweSignOut,
  } = useSIWE({
    onSignIn: async (session?: SIWESession) => {
      console.log('session:', session);
      if (!session?.address) return;
      const result = await nextAuthSignIn('web3', {
        address: session.address,
        redirect: false,
      });
      return result;
    },
    onSignOut: async () => {
      await nextAuthSignOut();
    },
  });

  const handleSignIn = async () => {
    try {
      await siweSignIn();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    await siweSignOut();
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, ensName }) => {
        console.log('isConnected:', isConnected);
        if (isConnected && !isSignedIn) {
          return (
            <Button
              onClick={handleSignIn}
              disabled={isLoading}
              className='rounded-full'
            >
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Signing In...
                </>
              ) : isRejected ? (
                'Signature Rejected'
              ) : isError ? (
                'Error Signing In'
              ) : (
                'Sign In With Ethereum'
              )}
            </Button>
          );
        }

        // Wallet connected and signed in
        if (isSignedIn && data?.address && session?.user?.profile) {
          const profile = {
            name: 'Padimaster',
            address: '0xb86f953FF6D86e9290CB8d3899a38DbF8268e775',
            handle: 'padimaster',
            avatar:
              'https://pbs.twimg.com/profile_images/1628134368664293412/yap-rvPy_400x400.jpg',
          };

          return (
            <div className='flex items-center gap-2 rounded-full bg-black/5 pr-2 transition-colors hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'>
              <div className='flex items-center gap-3 px-4 py-2'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>
                    {profile.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <span className='text-sm font-semibold leading-tight'>
                    {profile.name}
                  </span>
                  <div className='flex items-center gap-1'>
                    <span className='text-xs text-muted-foreground'>
                      @{profile.handle}
                    </span>
                    <span className='text-xs text-muted-foreground'>·</span>
                    <span className='text-xs text-muted-foreground'>
                      {ensName ?? truncateAddress(profile.address)}
                    </span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-8 w-8 rounded-full'
                  >
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        }

        if (!isConnected) {
          return <Button onClick={show}>Connect Wallet</Button>;
        }
        return null;
      }}
    </ConnectKitButton.Custom>
  );
};
