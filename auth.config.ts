import { SignInSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/lib/db";

export default {
  providers: [
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
