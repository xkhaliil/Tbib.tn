import React from "react";

import { getHealthcareProviderById } from "@/actions/auth";
import { getPatientById } from "@/actions/patient";
import { getPrescriptionById } from "@/actions/prescription";
import { PageBottom, Tailwind } from "@fileforge/react-print";
import { format } from "date-fns";

interface PrescriptionTemplateProps {
  prescription: Awaited<ReturnType<typeof getPrescriptionById>>;
  patient: Awaited<ReturnType<typeof getPatientById>>;
  healthcareProvider:
    | Awaited<ReturnType<typeof getHealthcareProviderById>>
    | undefined;
}

export function PrescriptionTemplate({
  prescription,
  patient,
  healthcareProvider,
}: PrescriptionTemplateProps) {
  return (
    <Tailwind>
      <div>
        <div className="mb-8 flex items-end justify-between pb-4">
          <div>
            <h1 className="text-2xl font-bold">
              Prescription for {patient?.user.gender === "MALE" ? "Mr." : "Ms."}{" "}
              {patient?.user.name}
            </h1>
            <p className="text-xs">{format(new Date(), "dd/MM/yyyy")}</p>
          </div>
          <div className="flex items-center">
            <span className="text-4xl font-bold tracking-tighter text-blue-600">
              Oladoc
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="mb-1 p-0">
            <b>Healthcare Provider:</b>
          </p>
          <p className="mb-1 p-0">{healthcareProvider?.user.name}</p>
          <p className="mb-1 p-0">{healthcareProvider?.speciality}</p>
          <p className="mb-1 p-0">{healthcareProvider?.user.phone}</p>
          <p className="mb-1 p-0">{healthcareProvider?.user.email}</p>
          <p className="mb-1 p-0">{healthcareProvider?.officeAddress}</p>
        </div>

        <div className="my-4 h-px bg-border" />

        <div>
          <p className="mb-1 p-0">
            <b>Prescription for:</b>
          </p>
          <p className="mb-1 p-0">{patient?.user.name}</p>
          <p className="mb-1 p-0">
            {patient?.user.state} - {patient?.user.city} -{" "}
            {patient?.user.postalCode}
          </p>
        </div>
      </div>

      <div className="my-4 h-px bg-border" />

      <p className="p-0 leading-5">
        This prescription is issued to the patient named above. The following
        medications are prescribed for the patient's treatment.
      </p>

      <table className="my-12 w-full">
        <tr className="border-b">
          <th className="py-2 text-left font-bold">Medication Name</th>
          <th className="py-2 text-left font-bold">Dosage</th>
          <th className="py-2 text-left font-bold">Frequency</th>
        </tr>

        <tbody>
          {prescription?.medications.map((medication, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{medication.name}</td>
              <td className="py-2">{medication.dosage}</td>
              <td className="py-2">{medication.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-4 h-px bg-border" />

      {prescription?.medicalCertificateType && (
        <div>
          <p className="mb-1 p-0">
            <b>Medical Certificate:</b>{" "}
            {prescription?.medicalCertificateType === "sick"
              ? "Sick Leave"
              : "Medical Certificate"}
          </p>

          <p className="mb-1 p-0">
            <b>Duration:</b>{" "}
            {format(
              prescription?.medicalCertificateStartDate as Date,
              "dd/MM/yyyy",
            )}
            {" - "}
            {format(
              prescription?.medicalCertificateEndDate as Date,
              "dd/MM/yyyy",
            )}
          </p>
          <p className="mb-1 p-0">
            <b>Reason:</b> {prescription?.medicalCertificatePurpose}
          </p>
        </div>
      )}

      <PageBottom>
        <div className="my-4 h-px bg-border" />

        <p className="text-xs">
          This prescription is digitally signed and does not require a physical
          signature.
        </p>
      </PageBottom>
    </Tailwind>
  );
}
