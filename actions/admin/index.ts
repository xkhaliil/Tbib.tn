"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import {
  compileRejectedUserEmailTemplate,
  compileRequestCustomEmailTemplate,
  compileVerifiedUserEmailTemplate,
  sendCustomEmail,
  sendRejectedUserEmail,
  sendVerifiedUserEmail,
} from "@/lib/mail";

export async function verifyHealthcareProvider(
  id: string | undefined,
  to: string,
  name: string,
  subject: string,
  sendname: string,
) {
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
    const body = await compileVerifiedUserEmailTemplate(sendname);
    await sendVerifiedUserEmail({ to, name, subject, body });
    return {
      success:
        "Healthcare provider verified successfully and a confirmation mail has been send",
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

export async function deleteHealthcareProvider(
  id: string | undefined,
  to: string,
  name: string,
  subject: string,
  sendname: string,
) {
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
    const body = await compileRejectedUserEmailTemplate(sendname);
    await sendVerifiedUserEmail({ to, name, subject, body });
    return { success: "Healthcare provider deleted successfully" };
  } catch (error) {
    console.error(error);
  }
}

export async function verifyHealthcareCenter(
  id: string | undefined,
  to: string,
  name: string,
  subject: string,
  sendname: string,
) {
  try {
    const healthCareCenter = await db.healthCareCenter.findUnique({
      where: {
        id: id,
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
        accountVerified: true,
      },
    });

    revalidatePath("/admin/healthcare-centers");
    const body = await compileVerifiedUserEmailTemplate(sendname);
    await sendVerifiedUserEmail({ to, name, subject, body });
    return { success: "Healthcare center verified successfully" };
  } catch (error) {
    console.error(error);
  }
}
export async function deleteHealthcareCenter(
  id: string | undefined,
  to: string,
  name: string,
  subject: string,
  sendname: string,
) {
  try {
    const healthCareCenter = await db.healthCareCenter.findUnique({
      where: {
        id: id,
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
    const body = await compileRejectedUserEmailTemplate(sendname);
    await sendRejectedUserEmail({ to, name, subject, body });
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
