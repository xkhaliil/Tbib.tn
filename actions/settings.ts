"use server";

import { unstable_update } from "@/auth";
import { ManageAccountSchemaType } from "@/schemas";
import bcrypt from "bcryptjs";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const settings = async (values: ManageAccountSchemaType) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return {
        error: "Incorrect password. Please enter your current password.",
      };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image || "",
      bio: updatedUser.bio || "",
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    },
  });

  return { success: "Account updated!" };
};
