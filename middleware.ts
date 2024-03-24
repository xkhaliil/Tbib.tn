import authConfig from "@/auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  healthcareProviderRoutes,
  patientRoutes,
  publicRoutes,
} from "@/routes";
import { Role, User } from "@prisma/client";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthenticationRoute = authRoutes.includes(nextUrl.pathname);
  const isPatientRoute = patientRoutes.includes(nextUrl.pathname);
  const isHealthcareProviderRoute = healthcareProviderRoutes.includes(
    nextUrl.pathname,
  );

  if (isApiAuthRoute || isPublicRoute) return null;

  // if (isAuthenticationRoute) {
  //   if (isLoggedIn)
  //     return Response.redirect(new URL(defaultRedirectUrl, nextUrl));
  //   return null;
  // }
  console.log("before");
  console.log("isloggedin : ", isLoggedIn);
  console.log("current user", req.auth?.user.role);
  console.log("role patient", Role.PATIENT);
  console.log("isPatientRoute", isPatientRoute);
  if (isLoggedIn && req.auth?.user.role === Role.PATIENT && !isPatientRoute) {
    return Response.redirect(new URL("/unauthorized", nextUrl));
  }
  console.log("after");
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/sign-in", nextUrl));
  }
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
