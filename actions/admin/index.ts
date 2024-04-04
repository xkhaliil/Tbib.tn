"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export async function verifyHealthcareProvider(id: string | undefined) {
  try {
    const healthCareProvider = await db.healthCareProvider.findUnique({
      where: {
        id: id,
      },
    });

    if (!healthCareProvider) {
      return { error: "Healthcare provider not found" };
    }

    await db.healthCareProvider.update({
      where: {
        id: id,
      },
      data: {
        accountVerified: true,
      },
    });

    revalidatePath("/admin/healthcare-providers");

    return { success: "Healthcare provider verified successfully" };
  } catch (error) {
    console.error(error);
  }
}

export async function deleteHealthcareProvider(id: string | undefined) {
  try {
    const healthCareProvider = await db.healthCareProvider.findUnique({
      where: {
        id: id,
      },
    });

    if (!healthCareProvider) {
      return { error: "Healthcare provider not found" };
    }

    await db.healthCareProvider.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/admin/healthcare-providers");

    return { success: "Healthcare provider deleted successfully" };
  } catch (error) {
    console.error(error);
  }
}
