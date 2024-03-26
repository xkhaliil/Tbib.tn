import { SignInSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

import { db } from "@/lib/db";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.user.findFirst({
            where: {
              email,
            },
          });

          if (!user || !user.password) return null;

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (isPasswordValid) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
