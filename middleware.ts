import authConfig from "@/auth.config";
import { apiAuthPrefix, patientRoutes, publicRoutes } from "@/routes";
import { Role } from "@prisma/client";
import NextAuth from "next-auth";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isPatientRoute = patientRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute || isPublicRoute) return undefined;

  if (isLoggedIn && req.auth?.user.role === Role.PATIENT && !isPatientRoute) {
    return Response.redirect(new URL("/patient/dashboard", nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/sign-in", nextUrl));
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
