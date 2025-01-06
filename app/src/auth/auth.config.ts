import { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getMinimalProfile, MinimalProfile } from "@/backend/profiles";
import { SiweMessage } from "siwe";
import { getCsrfToken } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"] &
      MinimalProfile;
  }
  interface User {
    profile: MinimalProfile | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    profile?: MinimalProfile | null;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "web3",
      name: "Web3",
      credentials: {
        message: { label: "Message", type: "text", placeholder: "0x0" },
        signature: { label: "Signature", type: "text", placeholder: "0x0" },
      },
      async authorize(credentials, req) {
        const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"));
        const nextAuthUrl = new URL(process.env.NEXTAUTH_URL || "");

        const result = await siwe.verify({
          signature: credentials?.signature || "",
          domain: nextAuthUrl.host,
          nonce: await getCsrfToken({ req }),
        });

        if (!result.success) {
          return null;
        }
        const profile = await getMinimalProfile(siwe.address);

        if (!profile) {
          return null;
        }

        return {
          id: profile._id,
          profile: profile,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 * 10, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
          token.profile = user.profile;
        }
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        throw error;
      }
    },
    async session({ session, token }) {
      try {
        session.user = {
          ...session.user,
          id: token.sub || "",
          ...(token.profile || {}),
        };
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        throw error;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    newUser: "/auth/signup",
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthOptions;
