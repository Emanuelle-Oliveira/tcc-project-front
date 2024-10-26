import KeycloakProvider from 'next-auth/providers/keycloak';
import NextAuth, {AuthOptions, TokenSet} from 'next-auth';
import { JWT } from 'next-auth/jwt';

function requestRefreshOfAccessToken(token: JWT) {
  const refreshToken = token.refreshToken as string;
  return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID as string,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    method: 'POST',
    cache: 'no-store'
  });
}

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 30
  },
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        return token;
      }

      const expiresAt = Number(token.expiresAt);
      if (Date.now() < (expiresAt * 1000 - 60 * 1000)) {
        console.log('token: ', token);
        return token;
      } else {
        try {
          const response = await requestRefreshOfAccessToken(token);
          const tokens: TokenSet = await response.json();
          if (!response.ok) throw tokens;

          const updatedToken: JWT = {
            ...token,
            idToken: tokens.id_token,
            accessToken: tokens.access_token,
            expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
            refreshToken: tokens.refresh_token ?? token.refreshToken,
          };
          return updatedToken;
        } catch (error) {
          console.error('Error refreshing access token', error);
          return {...token, error: 'RefreshTokenError'};
        }
      }
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      return session;
    }
  }
};

export default NextAuth(authOptions);

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      userName: string;
      name: string;
      email: string;
      address: string;
      zip: string;
      role: string;
      accessToken: string;
      refreshToken: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string
    expires_at: number
    refresh_token?: string
    error?: 'RefreshTokenError'
  }
}

