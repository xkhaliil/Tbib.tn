import { getTwoFactorAuthConfirmationTokenByUserId } from "@/actions/two-factor-auth-confirmation-token";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import NextAuth from "next-auth";

import {
  getHealthcareProviderById,
  getUserAccountById,
  getUserByEmail,
  getUserById,
} from "@/lib/auth";
import { db } from "@/lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  events: {
    linkAccount: async ({ user }) => {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
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

        // * Delete the two factor auth confirmation token
        await db.twoFactorAuthConfirmation.delete({
          where: {
            id: twoFactorAuthConfirmationToken.id,
          },
        });
      }

      return true;
    },
    // @ts-ignore
    session: async ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (token.speciality && session.user) {
        session.user.speciality = token.speciality;
        session.user.accountVerified = token.accountVerified;
        session.user.spokenLanguages = token.spokenLanguages;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
        session.user.bio = token.bio;
        session.user.image = token.image;
        session.user.isOAuth = token.isOAuth;
        session.user.gender = token.gender;
        session.user.dateOfBirth = token.dateOfBirth;
        session.user.phone = token.phone;
        session.user.city = token.city;
        session.user.state = token.state;
        session.user.postalCode = token.postalCode;
      }

      return session;
    },
    jwt: async ({ token, trigger, session }) => {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      const existingAccount = await getUserAccountById(token.sub);

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
      token.isOAuth = !!existingAccount;

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    error: "/auth/error",
  },
  ...authConfig,
});
