import { getAllAppointments, getAppointmentById } from "@/actions/appointment";
import {
  getHealthcareCenterById,
  getHealthcareProviderById,
} from "@/actions/auth";
import { getPatientById } from "@/actions/patient";

export type AppointmentsWithPatient = Awaited<
  ReturnType<typeof getAllAppointments>
>;

export type AppointmentWithPatient = Awaited<
  ReturnType<typeof getAppointmentById>
>;

export type Patient = Awaited<ReturnType<typeof getPatientById>>;

export type HealthCareProvider = Awaited<
  ReturnType<typeof getHealthcareProviderById>
>;

export type HealthcareCenter = Awaited<
  ReturnType<typeof getHealthcareCenterById>
>;
