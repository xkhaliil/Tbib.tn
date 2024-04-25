import { Role } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  gender: string;
  dateOfBirth: string;
  phone: string;
  city: string;
  state: string;
  postalCode: string;
  bio: string;
  role: Role;
  isTwoFactorEnabled: boolean;
  speciality?: string;
  spokenLanguages?: string[];
  accountVerified?: boolean;
  officeState?: string;
  officeAddress?: string;
  officeLatitude?: number;
  officeLongitude?: number;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
