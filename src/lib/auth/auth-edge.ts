const nextAuthEdgeConfig = {
  trustHost: true,
  secret: "Hello",
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    authorized: ({ auth, request }: any) => {
      // Run every request with middleware
      const isLoggedIn = Boolean(auth?.user);
      const pathName = request.nextUrl.pathname;
      const isTryingToAdminRoute = pathName.includes("/admin");
      const isTryingToAuthRote =
        pathName.includes("/login") || pathName.includes("/sign-up");

      if (!isLoggedIn && isTryingToAdminRoute) {
        return false;
      }

      if (isLoggedIn && isTryingToAdminRoute) {
        return true;
      }

      if (isLoggedIn && isTryingToAuthRote) {
        return Response.redirect(new URL("/admin", request.nextUrl));
      }

      return true;
    },
    jwt: ({ token, user, trigger }: any) => {
      if (user) {
        // When user sign in
        token.userId = user.id as string;
        token.email = user.email as string;
      }

      if (trigger === "update") {
        // When requesting update
      }

      return token;
    },
    session: ({ session, token}: any) => {
      if (session) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
};

export default nextAuthEdgeConfig;
