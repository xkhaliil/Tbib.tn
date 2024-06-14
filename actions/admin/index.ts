"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import {
  compileRequestCustomEmailTemplate,
  sendAccountVerifiedEmail,
  sendCustomEmail,
  sendDeletedAccountEmail,
} from "@/lib/mail";

export async function verifyHealthcareProvider(id: string | undefined) {
  try {
    const healthCareProvider = await db.healthCareProvider.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
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
        user: {
          update: {
            emailVerified: new Date(),
          },
        },
      },
    });

    revalidatePath("/admin/healthcare-providers");

    await sendAccountVerifiedEmail(healthCareProvider.user);

    return {
      success:
        "Healthcare provider verified successfully and a confirmation mail has been sent",
    };
  } catch (error) {
    console.error(error);
  }
}
export async function sendCustom(
  to: string,
  name: string,
  subject: string,
  sendname: string,
  custom: string,
) {
  try {
    const body = await compileRequestCustomEmailTemplate(sendname, custom);
    await sendCustomEmail({ to, name, subject, body });
    return { success: "Email sent successfully" };
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
      include: {
        user: true,
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

    await sendDeletedAccountEmail(healthCareProvider.user);

    return { success: "Healthcare provider deleted successfully" };
  } catch (error) {
    console.error(error);
  }
}

export async function verifyHealthcareCenter(id: string | undefined) {
  try {
    const healthCareCenter = await db.healthCareCenter.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    if (!healthCareCenter) {
      return { error: "Healthcare center not found" };
    }

    await db.healthCareCenter.update({
      where: {
        id: id,
      },
      data: {
        user: {
          update: {
            emailVerified: new Date(),
          },
        },
      },
    });

    revalidatePath("/admin/healthcare-centers");

    await sendAccountVerifiedEmail(healthCareCenter.user);

    return {
      success:
        "Healthcare center verified successfully and a confirmation mail has been sent",
    };
  } catch (error) {
    console.error(error);
  }
}

export async function deleteHealthcareCenter(id: string | undefined) {
  try {
    const healthCareCenter = await db.healthCareCenter.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    if (!healthCareCenter) {
      return { error: "Healthcare center not found" };
    }

    await db.healthCareCenter.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/admin/healthcare-centers");

    await sendDeletedAccountEmail(healthCareCenter.user);

    return { success: "Healthcare center deleted successfully" };
  } catch (error) {
    console.error(error);
  }
}

export async function getSelectedHealthcareCenter(id: string) {
  try {
    const healthCareCenter = await db.healthCareCenter.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    return healthCareCenter;
  } catch (error) {
    console.error(error);
  }
}
