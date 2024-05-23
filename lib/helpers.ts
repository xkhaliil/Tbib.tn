import { getPatientRecord } from "@/actions/patient";
import { Record } from "@prisma/client";

/**
 * This function is used to check if a patient has a complete record or not
 * @param record
 * @returns {boolean}
 */
export function patientHasCompleteRecord(
  record: Awaited<ReturnType<typeof getPatientRecord>>,
): boolean {
  if (
    record?.weight === null ||
    record?.height === null ||
    record?.bloodPressure === null ||
    record?.bmi === null ||
    record?.smoker === null ||
    record?.alcohol === null ||
    record?.occupation === null ||
    record?.bloodType === null
  ) {
    return false;
  }
  return true;
}
