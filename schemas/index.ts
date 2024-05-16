import { SymptomType } from "@/constants";
import { Role } from "@prisma/client";
import { isEqual } from "date-fns";
import * as z from "zod";

// Create a phone regex that starts with a +216 and is followed by 8 digits.
const phoneRegex = /^([0-9]{8})$/;

export const SignInSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Email must be a valid email" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be at least 8 characters long" }),
  verificationCode: z.optional(z.string()),
});

export const SignUpSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({ message: "Email must be a valid email" }),
    phone: z
      .string({
        required_error: "Phone is required",
        invalid_type_error: "Phone must be a string",
      })
      .refine((phone) => phoneRegex.test(phone), {
        message: "Phone must be a valid phone number",
      }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string({
        required_error: "Password confirmation is required",
        invalid_type_error: "Password confirmation must be a string",
      })
      .min(8, {
        message: "Password confirmation must be at least 8 characters long",
      }),
    role: z.nativeEnum(Role),
    speciality: z.optional(z.string()),
    state: z.optional(z.string()),
    city: z.optional(z.string()),
    postalCode: z.optional(z.string()),
    verificationDocuments: z.optional(z.array(z.string())),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The password and confirm password fields must match.",
        path: ["confirmPassword"],
      });
    }
  })
  .refine(
    (data) => {
      if (data.role === Role.HEALTHCARE_PROVIDER && !data.speciality) {
        return false;
      }

      return true;
    },
    {
      message: "Please select a speciality",
      path: ["speciality"],
    },
  )
  .refine(
    (data) => {
      if (data.role === Role.HEALTHCARE_CENTER && !data.state) {
        return false;
      }

      return true;
    },
    {
      message: "Please select a state",
      path: ["state"],
    },
  )
  .refine(
    (data) => {
      if (data.role === Role.HEALTHCARE_CENTER && !data.city) {
        return false;
      }

      return true;
    },
    {
      message: "City is required",
      path: ["city"],
    },
  )
  .refine(
    (data) => {
      if (data.role === Role.HEALTHCARE_CENTER && !data.postalCode) {
        return false;
      }

      return true;
    },
    {
      message: "Postal code is required",
      path: ["postalCode"],
    },
  )
  // * If the user is a healthcare provider or healthcare center, the verification documents are required.
  .refine(
    (data) => {
      if (
        (data.role === Role.HEALTHCARE_PROVIDER ||
          data.role === Role.HEALTHCARE_CENTER) &&
        data.verificationDocuments?.length === 0
      ) {
        return false;
      }

      return true;
    },
    {
      message: "Verification documents are required",
      path: ["verificationDocuments"],
    },
  );

export const ForgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Email must be a valid email" }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(8, { message: "Password must be at least 8 characters long" }),
    passwordConfirmation: z
      .string({
        required_error: "Password confirmation is required",
        invalid_type_error: "Password confirmation must be a string",
      })
      .min(8, {
        message: "Password confirmation must be at least 8 characters long",
      }),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The password and confirm password fields must match.",
        path: ["confirmPassword"],
      });
    }
  });

export const ManageAccountSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    dateOfBirth: z.optional(z.date()),
    phone: z.optional(
      z.string().refine((phone) => phoneRegex.test(phone), {
        message: "Phone must be a valid phone number",
      }),
    ),
    gender: z.optional(z.enum(["MALE", "FEMALE"])),
    image: z.optional(z.string()),
    bio: z.optional(z.string()),
    state: z.optional(z.string()),
    city: z.optional(z.string()),
    postalCode: z.optional(z.string()),
    password: z.optional(
      z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    ),
    newPassword: z.optional(
      z
        .string()
        .min(6, { message: "New password must be at least 6 characters long" }),
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      // * If the new password field is empty, return false and show an error message.
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      // * If the password field is empty, return false and show an error message.
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  )
  .refine(
    (data) => {
      // * If the name field is empty, return false and show an error message.
      if (data.name === "") {
        return false;
      }

      return true;
    },
    { message: "Name is required!", path: ["name"] },
  )
  .refine(
    (data) => {
      if (data.state === "") {
        return false;
      }

      return true;
    },
    { message: "State is required!", path: ["state"] },
  )
  .refine(
    (data) => {
      if (data.city === "") {
        return false;
      }

      return true;
    },
    { message: "City is required!", path: ["city"] },
  )
  .refine(
    (data) => {
      if (data.postalCode === "") {
        return false;
      }

      return true;
    },
    { message: "Postal code is required!", path: ["postalCode"] },
  );

export const CreateAppointmentSchema = z
  .object({
    title: z.string({ required_error: "Title is required" }).min(3, {
      message: "Title must be at least 3 characters long.",
    }),
    description: z
      .string({ required_error: "Description is required" })
      .min(10, { message: "Description must be at least 10 characters long." })
      .max(100, {
        message: "Description must be at most 100 characters long.",
      }),
    day: z.date(),
    startTime: z.date(),
    endTime: z.date(),
    status: z.enum(["PENDING", "UPCOMING"]),
    patientId: z.string(),
  })
  .refine(
    (data) => {
      if (data.startTime > data.endTime) {
        return false;
      }

      return true;
    },
    {
      message: "Start time must be before the end time",
      path: ["startTime"],
    },
  )
  .refine(
    (data) => {
      if (isEqual(data.startTime, data.endTime)) {
        return false;
      }

      return true;
    },
    {
      message: "Start time and end time must be different",
      path: ["startTime"],
    },
  );

export const EditAppointmentSchema = z
  .object({
    title: z.string({ required_error: "Title is required" }).min(3, {
      message: "Title must be at least 3 characters long.",
    }),
    description: z
      .string({ required_error: "Description is required" })
      .min(10, { message: "Description must be at least 10 characters long." })
      .max(100, {
        message: "Description must be at most 100 characters long.",
      }),
    day: z.date(),
    startTime: z.date(),
    endTime: z.date(),
    status: z.enum([
      "PENDING",
      "UPCOMING",
      "CANCELLED",
      "EXPIRED",
      "COMPLETED",
    ]),
  })
  .refine(
    (data) => {
      if (data.startTime > data.endTime) {
        return false;
      }

      return true;
    },
    {
      message: "Start time must be before the end time",
      path: ["startTime"],
    },
  )
  .refine(
    (data) => {
      if (isEqual(data.startTime, data.endTime)) {
        return false;
      }

      return true;
    },
    {
      message: "Start time and end time must be different",
      path: ["startTime"],
    },
  );

export const CreateAbsenceSchema = z.object({
  date: z.date(),
});

export const ManageHealthcareProviderProfileSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    phone: z.optional(
      z.string().refine((phone) => phoneRegex.test(phone), {
        message: "Phone must be a valid phone number",
      }),
    ),
    image: z.optional(z.string()),
    bio: z.optional(z.string()),
    password: z.optional(
      z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    ),
    newPassword: z.optional(
      z
        .string()
        .min(6, { message: "New password must be at least 6 characters long" }),
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    speciality: z.optional(z.string()),
    spokenLanguages: z.optional(z.array(z.string())),
    officeState: z.optional(z.string()),
    officeAddress: z.optional(z.string()),
    officeLatitude: z.optional(z.number()),
    officeLongitude: z.optional(z.number()),
    state: z.optional(z.string()),
    city: z.optional(z.string()),
    postalCode: z.optional(z.string()),
  })
  .refine(
    (data) => {
      // * If the new password field is empty, return false and show an error message.
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      // * If the password field is empty, return false and show an error message.
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  )
  .refine(
    (data) => {
      // * If the name field is empty, return false and show an error message.
      if (data.name === "") {
        return false;
      }

      return true;
    },
    { message: "Name is required!", path: ["name"] },
  )
  .refine(
    (data) => {
      if (data.speciality === "") {
        return false;
      }

      return true;
    },
    { message: "Speciality is required!", path: ["speciality"] },
  )
  .refine(
    (data) => {
      if (data.state === "") {
        return false;
      }

      return true;
    },
    { message: "State is required!", path: ["state"] },
  )
  .refine(
    (data) => {
      if (data.city === "") {
        return false;
      }

      return true;
    },
    { message: "City is required!", path: ["city"] },
  )
  .refine(
    (data) => {
      if (data.postalCode === "") {
        return false;
      }

      return true;
    },
    { message: "Postal code is required!", path: ["postalCode"] },
  );

export const BookAppointmentSchema = z.object({
  date: z.date(),
  time: z.string({ required_error: "Please select a time" }),
  symptomsType: z.nativeEnum(SymptomType),
  symptoms: z.optional(z.string()),
  symptomsDuration: z
    .optional(z.string())
    .refine((duration) => duration !== undefined && parseInt(duration) > 0, {
      message: "Duration must be greater than 0",
    }),
  symptomsSeverity: z.optional(z.enum(["LOW", "MEDIUM", "HIGH"])),
  symptomsLength: z.optional(z.enum(["DAYS", "WEEKS", "MONTHS"])),
  additionalImages: z.optional(z.array(z.string())),
});

export const ManageOpeningHoursSchema = z.object({
  openingHours: z.array(
    z.object({
      dayOfWeek: z.number(),
      startTime: z.date(),
      endTime: z.date(),
      isClosed: z.boolean(),
    }),
  ),
});

export const UploadDocumentSchema = z
  .object({
    title: z.string({ required_error: "Title is required" }).min(3, {
      message: "Title must be at least 3 characters long.",
    }),
    description: z.optional(
      z.string().max(250, {
        message: "Description must be at most 100 characters long.",
      }),
    ),
    file: z.string(),
  })
  .refine(
    (data) => {
      if (!data.file) {
        return false;
      }

      return true;
    },
    {
      message: "Document is required",
      path: ["file"],
    },
  );

export const SendNewMessageSchema = z
  .object({
    content: z.optional(z.string()),
    file: z.optional(z.string()),
  })
  .refine(
    // * If the content and file fields are empty, return false and show an error message.
    (data) => {
      if (!data.content && !data.file) {
        return false;
      }

      return true;
    },
    {
      message: "Content or file is required!",
      path: ["content"],
    },
  );

export const AddNewReviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
export type ManageAccountSchemaType = z.infer<typeof ManageAccountSchema>;
export type CreateAppointmentSchemaType = z.infer<
  typeof CreateAppointmentSchema
>;
export type EditAppointmentSchemaType = z.infer<typeof EditAppointmentSchema>;
export type CreateAbsenceSchemaType = z.infer<typeof CreateAbsenceSchema>;
export type ManageHealthcareProviderProfileSchemaType = z.infer<
  typeof ManageHealthcareProviderProfileSchema
>;
export type BookAppointmentSchemaType = z.infer<typeof BookAppointmentSchema>;
export type ManageOpeningHoursSchemaType = z.infer<
  typeof ManageOpeningHoursSchema
>;
export type UploadDocumentSchemaType = z.infer<typeof UploadDocumentSchema>;
export type SendNewMessageSchemaType = z.infer<typeof SendNewMessageSchema>;
export type AddNewReviewSchemaType = z.infer<typeof AddNewReviewSchema>;
