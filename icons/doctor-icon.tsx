import React from "react";

interface DoctorIconProps {
  props?: React.SVGProps<SVGSVGElement>;
  className?: string;
}

export function DoctorIcon({ props, className }: DoctorIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
      className={className}
    >
      <path
        stroke="#000"
        className="stroke-sky-600"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M20 22v-3c0-2.828 0-4.243-.879-5.121C18.243 13 16.828 13 14 13l-2 2-2-2c-2.828 0-4.243 0-5.121.879C4 14.757 4 16.172 4 19v3M16 13v5.5"
      ></path>
      <path
        stroke="#000"
        className="stroke-sky-600"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8.5 13v4m0 0a2 2 0 012 2v1m-2-3a2 2 0 00-2 2v1M15.5 6.5v-1a3.5 3.5 0 10-7 0v1a3.5 3.5 0 107 0z"
      ></path>
      <path
        stroke="#000"
        className="stroke-sky-600"
        strokeWidth="1.5"
        d="M16.75 19.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      ></path>
    </svg>
  );
}
