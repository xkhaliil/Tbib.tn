import React from "react";

import { FaEye, FaFileDownload } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";

export default function PdfViewer() {
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
                  <div className="font-mono flex items-center justify-between rounded-md border px-4 py-3 text-sm">
                    <div>Uploaded file</div>
                    <div className="flex items-center space-x-3">
                      <FaFileDownload />
                      <FaEye />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
