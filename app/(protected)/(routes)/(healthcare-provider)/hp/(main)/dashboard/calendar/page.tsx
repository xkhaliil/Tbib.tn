import { getAllAbsences } from "@/actions/absence";
import { getAllAppointments } from "@/actions/appointment";
import { getCurrentSession, getHealthcareProviderById } from "@/actions/auth";
import { getOpeningHoursByProviderId } from "@/actions/opening-hours";

import { Calendar } from "@/components/base/calendar";

export default async function CalendarPage() {
  const currentUser = await getCurrentSession();
  const healthCareProvider = await getHealthcareProviderById(currentUser?.id);
  const appointments = await getAllAppointments();
  const absences = await getAllAbsences();
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
