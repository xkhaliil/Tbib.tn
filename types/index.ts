import { getAllAppointments, getAppointmentById } from "@/actions/appointment";
import { getPatientById } from "@/actions/patient";

export type AppointmentsWithPatient = Awaited<
  ReturnType<typeof getAllAppointments>
>;

export type AppointmentWithPatient = Awaited<
  ReturnType<typeof getAppointmentById>
>;

export type Patient = Awaited<ReturnType<typeof getPatientById>>;
