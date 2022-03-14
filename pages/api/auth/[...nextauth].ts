import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        url: "https://accounts.google.com/o/oauth2/auth?response_type=code&prompt=select_account",
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.id = account.userId;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.userId = token.sub;
      session.provider = token.provider;

      return session;
    },
  },
  secret: "sunSAd2RkCajg2DLRJ+5MfsinFwws8ZuzfPm2C+FXkc=",
  session: {
    strategy: "jwt",
  },
 
});
