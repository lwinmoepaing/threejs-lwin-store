import NextAuth from "next-auth";

import nextAuthEdgeConfig from "./lib/auth/auth-edge";

export default NextAuth(nextAuthEdgeConfig as any).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
