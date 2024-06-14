import { getSelectedHealthcareCenter } from "@/actions/admin";
import { getDoctorById } from "@/actions/doctors";

import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import ApproveCard from "@/components/base/admin-dashboard/components/hcc-components/approve-card";
import PdfViewer from "@/components/base/admin-dashboard/components/hcc-components/pdf-viewer";
import { SpecificUserData } from "@/components/base/admin-dashboard/components/hcc-components/specific-user-data";
import { UserData } from "@/components/base/admin-dashboard/components/hcc-components/user-data";

interface HealthcareCenterDetailsPageParams {
  params: {
    id: string;
  };
}

export default async function HealthcareCenterDetailsPage({
  params,
}: HealthcareCenterDetailsPageParams) {
  const { id } = params;
  const selectedHealthcareCenter = await getSelectedHealthcareCenter(id);

  return (
    <div>
      <div className="grid h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div className="flex flex-col">
          <AdminNavbar />
          <div className="grid h-screen w-full">
            <div className="flex flex-col">
              <header className=" top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                <h1 className="text-xl font-semibold">
                  {selectedHealthcareCenter?.user.name}&apos;s Details
                </h1>
              </header>
              <main className="grid flex-1 gap-4 overflow-auto p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="relative flex-col items-start gap-8 md:flex">
                  <UserData hcc={selectedHealthcareCenter} />
                </div>
                <div>
                  <SpecificUserData hcc={selectedHealthcareCenter} />
                </div>
                <div className="grid grid-rows-6 flex-col ">
                  <PdfViewer hcc={selectedHealthcareCenter} />
                  <div>
                    <ApproveCard hcc={selectedHealthcareCenter || null} />
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
