"use client";

import Image from "next/image";
import { User } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { HealthcareProvidersDataTableActions } from "./actions";

type HealthcareProvider = {
  id: string;
  user: User;
  speciality: string;
  accountVerified: boolean;
  verificationDocuments: string[];
};

const columnHelper = createColumnHelper<HealthcareProvider>();

export const columns = [
  columnHelper.accessor("user.name", {
    header: "Name",
    id: "name",
    cell: ({ row }) => {
      const email = row.original.user.email;
      return (
        <div className="flex items-center space-x-4">
          <Image
            alt="Profile Image"
            className="aspect-square rounded-md object-cover"
            src={row.original.user.image ?? "/placeholder.svg"}
            height="36"
            width="36"
          />
          <div className="flex flex-col">
            <h1 className="font-medium">{row.getValue("name")}</h1>
            <div className="hidden text-sm text-muted-foreground md:inline">
              {email}
            </div>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("speciality", {
    id: "speciality",
    header: "Speciality",
  }),
  columnHelper.accessor("accountVerified", {
    id: "accountVerified",
    header: "Account Status",
    cell: ({ row }) => {
      return (
        <span
          className={cn(
            "rounded-sm px-2.5 py-1 text-xs font-medium",
            row.original.accountVerified
              ? "bg-green-100 text-green-600"
              : "bg-rose-100 text-rose-600",
          )}
        >
          {row.original.accountVerified ? "Verified" : "Not Verified"}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("verificationDocuments", {
    id: "verificationDocuments",
    header: "Verification Documents",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.verificationDocuments &&
            row.original.verificationDocuments.map((doc, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-24 cursor-pointer items-center space-x-2 rounded-lg p-2 hover:bg-accent",
                  row.original.verificationDocuments.length === 0 &&
                    "cursor-not-allowed opacity-50",
                )}
              >
                <svg
                  fill="none"
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0"
                  viewBox="0 0 20 21"
                >
                  <g clip-path="url(#clip0_3173_1381)">
                    <path
                      fill="#E2E5E7"
                      d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"
                    />
                    <path
                      fill="#B0B7BD"
                      d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"
                    />
                    <path
                      fill="#CAD1D8"
                      d="M18.774 9.25l-3.75-3.75h3.75v3.75z"
                    />
                    <path
                      fill="#F15642"
                      d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z"
                    />
                    <path
                      fill="#fff"
                      d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z"
                    />
                    <path
                      fill="#CAD1D8"
                      d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3173_1381">
                      <path
                        fill="#fff"
                        d="M0 0h20v20H0z"
                        transform="translate(0 .5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <a
                  href={doc}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-blue-600"
                >
                  View
                </a>
              </div>
            ))}
          {row.original.verificationDocuments &&
            row.original.verificationDocuments.length === 0 &&
            "No documents"}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      return (
        <HealthcareProvidersDataTableActions
          healthcareProvider={row.original}
        />
      );
    },
  }),
];
