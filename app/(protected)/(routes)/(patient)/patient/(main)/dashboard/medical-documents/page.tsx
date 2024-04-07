import React from "react";

import { getCurrentSession, getPatientById } from "@/actions/auth";
import { getPatientDocuments } from "@/actions/patient";

import { EmptyState } from "@/components/base/patient/medical-documents/empty-state";
import { MedicalDocumentCard } from "@/components/base/patient/medical-documents/medical-document-card";
import { UploadMedicalDocumentButton } from "@/components/base/patient/medical-documents/upload-medical-document-button";

export default async function PatientMedicalDocumentsPage() {
  const currentUser = await getCurrentSession();
  const currentPatient = await getPatientById(currentUser?.id);
  const medicalDocuments = await getPatientDocuments(currentPatient?.id);
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Medical Documents</h1>
        {medicalDocuments && medicalDocuments.length > 0 && (
          <UploadMedicalDocumentButton />
        )}
      </div>
      {medicalDocuments?.length === 0 && <EmptyState />}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {medicalDocuments?.map((document) => (
          <MedicalDocumentCard key={document.id} medicalDocument={document} />
        ))}
      </div>
    </div>
  );
}
