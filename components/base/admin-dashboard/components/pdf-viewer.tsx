"use client";

import React from "react";

import { getDoctorById } from "@/actions/doctors";
import { FaEye, FaFileDownload } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Doctor = Awaited<ReturnType<typeof getDoctorById>>;

interface HealthcareProviderDetailsPageParams {
  doctor: Doctor;
}

export default function PdfViewer({
  doctor,
}: HealthcareProviderDetailsPageParams) {
  return (
    <form className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Uploaded documents
        </legend>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-3">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center  space-x-3">
                    <FaFilePdf /> <div>Document(s)</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {doctor?.verificationDocuments.map((doc, i) => (
                    <div className="font-mono flex items-center justify-between rounded-md border px-4 py-3 text-sm">
                      <div>Document n°{i + 1}</div>
                      <div className="flex items-center space-x-3">
                        <FaEye onClick={() => window.open(doc, "_blank")} />
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
