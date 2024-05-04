import { getDoctorById } from "@/actions/doctors";

import { getHealthcareProviderById } from "@/actions/auth";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminNavbar } from "@/components/base/admin-dashboard/admin-navbar";
import { AdminSidebar } from "@/components/base/admin-dashboard/admin-sidebar";
import { UserData } from "@/components/base/admin-dashboard/components/user-data";
import { SpecificUserData } from "@/components/base/admin-dashboard/components/specific-user-data";
import PdfViewer from "@/components/base/admin-dashboard/components/pdf-viewer";
import ApproveCard from "@/components/base/admin-dashboard/components/approve-card";



interface HealthcareProviderDetailsPageParams {
  params: {
    id: string;
  };
}

export default async function HealthcareProviderDetailsPage({
  params,
}: HealthcareProviderDetailsPageParams) {
  const { id } = params;
  const selectedDoctor = await getDoctorById(id);

  const healthcareProvider = await getHealthcareProviderById(params.id);
  return (
    <div className="grid h-screen md:grid-cols-[220px_1fr] md:grid-rows-[56px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminNavbar />
      <AdminSidebar />
      <ScrollArea className="col-start-1 col-end-3 flex-1 md:col-start-2">
        <header className="top-0 flex items-center bg-background px-4 pt-6">
          <h1 className="text-xl font-semibold">
            {healthcareProvider?.user.name || "Healthcare Provider"}
          </h1>
        </header>
        <div className="flex flex-col">
          <AdminNavbar />
          <div className="grid h-screen w-full ">
            <div className="flex flex-col">
              <header className=" top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                <h1 className="text-xl font-semibold">
                  Dr {selectedDoctor?.user.name}'s details
                </h1>
              </header>
              <main className="grid flex-1 gap-4 overflow-auto p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="relative flex-col items-start gap-8 md:flex">
                  <UserData doctor={selectedDoctor} />
                </div>
                <div>
                  <SpecificUserData doctor={selectedDoctor} />
                </div>
                <div className="grid grid-rows-6 flex-col ">
                  <PdfViewer doctor={selectedDoctor} />
                  <div>
                    <ApproveCard healthcareProvider={selectedDoctor || null} />
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
        
      </ScrollArea>
    </div>
  );
}
