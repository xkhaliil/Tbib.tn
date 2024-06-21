import { getHealthcareProviderById } from "@/actions/auth";
import { getPatientById } from "@/actions/patient";
import { getPrescriptionById } from "@/actions/prescription";
import { PrescriptionTemplate } from "@/pdfs/prescription-template";
import { FileforgeClient } from "@fileforge/client";
import { compile } from "@fileforge/react-print";

const ff = new FileforgeClient({
  apiKey: "21c4df17-4b89-4d3d-b78f-13fddfa72cfa",
});

export async function generatePrescriptionInPdf(
  prescription: Awaited<ReturnType<typeof getPrescriptionById>>,
  patient: Awaited<ReturnType<typeof getPatientById>>,
  healthcareProvider:
    | Awaited<ReturnType<typeof getHealthcareProviderById>>
    | undefined,
) {
  const HTML = await compile(
    PrescriptionTemplate({
      prescription,
      patient,
      healthcareProvider,
    }),
  );

  (async () => {
    try {
      const pdf = await ff.pdf.generate(
        [new File([HTML], "index.html", { type: "text/html" })],
        {
          options: {
            host: true,
          },
        },
        {
          timeoutInSeconds: 30,
        },
      );

      window.open(pdf.url, "_blank");
    } catch (error) {
      console.error("Error during PDF conversion:", error);
    }
  })();
}
