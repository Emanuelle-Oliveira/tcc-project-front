import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider refetchInterval={30 * 60}>
      {children}
    </SessionProvider>
  );
}