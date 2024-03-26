import React from "react";

import { CalendarIcon } from "@radix-ui/react-icons";
import { FileSpreadsheetIcon, HeartPulseIcon, UsersIcon } from "lucide-react";
import { BsHospitalFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";

import { AdminStatsCard } from "./admin-stats-card";

export function AdminStatsWrapper() {
  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-3 ">
        <AdminStatsCard title="Patients" value="146" icon={UsersIcon} />
        <AdminStatsCard
          title="Doctors"
          value="56"
          icon={FaUserDoctor}
          className="xl:pl-6"
        />
        <AdminStatsCard
          title="healthcare centers"
          value="78"
          icon={BsHospitalFill}
          className="xl:pl-6"
        />
      </div>
    </div>
  );
}
