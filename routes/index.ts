/**
 * An array of routes that require authentication
 * These routes are protected by the Middleware
 * @type {string[]}
 */
export const protectedRoutes: string[] = [
  "/protected",
  "/settings",
  "/dashboard",
];

/**
 * An array of routes that does not require authentication
 * These routes are not protected by the Middleware and can be accessed by the public
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/appointments/book",
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/verify",
  "/api/uploadthing",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect to the main page if the user is already logged in
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/error",
];

/**
 * The prefix for the API authentication routes
 * Routes that start with this prefix will be handled by the API for authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect URL after authentication
 * @type {string}
 */
export const defaultRedirectUrl: string = "/dashboard";

/**
 * An array of routes that are used by the patient
 * These routes are only accessible by the patient and are protected by the Middleware
 * @type {string[]}
 */
export const healthcareProviderRoutes: string[] = [
  "/hp/dashboard",
  "/hp/dashboard/calendar",
  "/hp/dashboard/messages",
  "/hp/dashboard/patients",
  "/hp/dashboard/consultations",
  "/hp/dashboard/documents",
  "/hp/dashboard/settings",
  "/hp/dashboard/settings/security",
  "/hp/dashboard/settings/notifications",
  "/hp/dashboard/settings/team",
];

/**
 * An array of routes that are used by the patient
 * These routes are only accessible by the patient and are protected by the Middleware
 * @type {string[]}
 */
export const patientRoutes: string[] = ["/patient/dashboard"];
