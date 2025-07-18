"use client";

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';


export const HomeView = () => {
    const router = useRouter();

  const {data: session} = authClient.useSession();
  if (!session) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
        <h1>Welcome, {session.user.name}!</h1>
        <p>Email: {session.user.email}</p>
        <Button className='bg-primary text-primary-foreground' onClick={() => authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push('/sign-in'),
                onError: (error) => console.error('Sign out failed:', error),
            }
        })}>
          Sign Out
        </Button>
        <p>Your session expires at: {new Date(session.session.expiresAt).toLocaleString()}</p>
      </div>
  )
}