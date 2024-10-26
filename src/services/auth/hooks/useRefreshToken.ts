import {signIn, useSession} from 'next-auth/react';

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    if (!session) {
      return;
    }
    const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID as string,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET as string,
        grant_type: 'refresh_token',
        refresh_token: session.user.refreshToken,
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      signIn();
      return;
    }

    const data = await response.json();
    session.user.accessToken = data.access_token;
    session.user.refreshToken=data.refreshToken;
  };

  return refreshToken;
};