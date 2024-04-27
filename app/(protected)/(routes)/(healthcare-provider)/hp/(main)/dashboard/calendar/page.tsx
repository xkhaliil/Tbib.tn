import { getAllAbsences } from "@/actions/absence";
import { getAllAppointments } from "@/actions/appointment";
import {
  getCurrentSession,
  getHealthcareProviderByUserId,
} from "@/actions/auth";
import { getOpeningHoursByProviderId } from "@/actions/opening-hours";

import { Calendar } from "@/components/base/calendar";

export default async function CalendarPage() {
  const currentUser = await getCurrentSession();
  const healthCareProvider = await getHealthcareProviderByUserId(
    currentUser?.id,
  );
  const appointments = await getAllAppointments(healthCareProvider?.id);
  const absences = await getAllAbsences(healthCareProvider?.id);
  const openingHours = await getOpeningHoursByProviderId(
    healthCareProvider?.id,
  );
  return (
    <>
      {appointments && absences && (
        <Calendar
          appointments={appointments}
          absences={absences}
          openingHours={openingHours}
        />
      )}
    </>
  );
}
