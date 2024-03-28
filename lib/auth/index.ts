import {
  getHealthcareProviderById,
  getUserAccountById,
  getUserByEmail,
  getUserById,
} from "@/actions/auth";
import { getTwoFactorAuthConfirmationTokenByUserId } from "@/actions/two-factor-auth-confirmation-token";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import NextAuth from "next-auth";

import config from "@/lib/auth/config";
import { db } from "@/lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserByEmail(user.email);

      if (!existingUser?.emailVerified) return false;

      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorAuthConfirmationToken =
          await getTwoFactorAuthConfirmationTokenByUserId(existingUser.id);

        if (!twoFactorAuthConfirmationToken) return false;

        await db.twoFactorAuthConfirmation.delete({
          where: {
            id: twoFactorAuthConfirmationToken.id,
          },
        });
      }

      return true;
    },
    session: async ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (token.speciality && session.user) {
        session.user.speciality = token.speciality as string;
        session.user.accountVerified = token.accountVerified as boolean;
        session.user.spokenLanguages = token.spokenLanguages as string[];
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.bio = token.bio as string;
        session.user.image = token.image as string;
        session.user.gender = token.gender as string;
        session.user.dateOfBirth = token.dateOfBirth as string;
        session.user.phone = token.phone as string;
        session.user.city = token.city as string;
        session.user.state = token.state as string;
        session.user.postalCode = token.postalCode as string;
      }

      return session;
    },
    jwt: async ({ token, trigger, session }) => {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      const existingHealthcareProvider = await getHealthcareProviderById(
        token.sub,
      );

      if (existingHealthcareProvider) {
        token.speciality = existingHealthcareProvider.speciality;
        token.accountVerified = existingHealthcareProvider.accountVerified;
        token.spokenLanguages = existingHealthcareProvider.spokenLanguages;
      }

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.gender = existingUser.gender;
      token.dateOfBirth = existingUser.dateOfBirth;
      token.phone = existingUser.phone;
      token.city = existingUser.city;
      token.state = existingUser.state;
      token.postalCode = existingUser.postalCode;
      token.bio = existingUser.bio;
      token.image = existingUser.image;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return token;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    error: "/auth/error",
  },
  ...config,
});
