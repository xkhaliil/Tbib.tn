import { getAllAbsences } from "@/actions/absence";
import { getAllAppointments } from "@/actions/appointment";

import { Calendar } from "@/components/base/calendar";

export default async function CalendarPage() {
  const appointments = await getAllAppointments();
  const absences = await getAllAbsences();
  return (
    <>
      {appointments && absences && (
        <Calendar appointments={appointments} absences={absences} />
      )}
    </>
  );
}
