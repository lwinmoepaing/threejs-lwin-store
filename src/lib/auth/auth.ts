import NextAuth from "next-auth";
import nextAuthEdgeConfig from "./auth-edge";

const config = {
  ...nextAuthEdgeConfig,
  providers: [
    
  ],
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config as any);
