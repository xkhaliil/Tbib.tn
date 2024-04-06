import React from "react";

import {
  getHealthcareCentersCount,
  totalHealthcareCentersYearlyWithIncrease,
} from "@/actions/healthcare-center";
import { totalHealthcareProvidersYearlyWithIncrease } from "@/actions/healthcare-provider";

export async function TotalHealthCareCentersUsersCard() {
  const totalHealthcareCentersInThisYear =
    await totalHealthcareCentersYearlyWithIncrease();
  const totalHealthcareCentersCount = await getHealthcareCentersCount();

  return (
    <div className="flex h-28 w-screen items-center justify-between rounded-md bg-white p-4 shadow">
      <div>
        <h6 className="text-xs font-medium uppercase leading-none tracking-wider text-gray-500">
          Total healthcare providers
        </h6>
        <span className="text-xl font-semibold">
          {totalHealthcareCentersCount}
        </span>
        <span className="ml-2 inline-block rounded-md bg-green-100 px-2 py-px text-xs text-green-500">
          +{totalHealthcareCentersInThisYear.increase}%
        </span>
      </div>
      <div>
        <span>
          <svg
            className="h-12 w-12 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
}
