import { signIn, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

export default function SessionGuard({ children }: { children: ReactNode }) {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  return <>{children}</>;
}