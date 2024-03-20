import React from "react";

interface HealthcareCenterIconProps {
  props?: React.SVGProps<SVGSVGElement>;
  className?: string;
}

export function HealthcareCenterIcon({
  props,
  className,
}: HealthcareCenterIconProps) {
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
        strokeWidth="1.5"
        d="M2 22h20"
      ></path>
      <path
        stroke="#000"
        className="stroke-sky-600"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18 9h-4c-2.482 0-3 .518-3 3v10h10V12c0-2.482-.518-3-3-3z"
      ></path>
      <path
        stroke="#000"
        className="stroke-sky-600"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15 22H3V5c0-2.482.518-3 3-3h6c2.482 0 3 .518 3 3v4"
      ></path>
      <path
        stroke="#000"
        className="stroke-sky-600"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M3 6h3m-3 4h3m-3 4h3M15 13h2m-2 3h2"
      ></path>
      <path
        stroke="#000"
        className="stroke-sky-600"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16 22v-3"
      ></path>
    </svg>
  );
}
