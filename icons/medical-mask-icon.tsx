import React from "react";

interface MedicalMaskIconProps {
  props?: React.SVGProps<SVGSVGElement>;
  className?: string;
}

export function MedicalMaskIcon({ props, className }: MedicalMaskIconProps) {
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
        d="M10 8.5H8.707c-.453 0-.887.18-1.207.5m6.5-.5h1.293c.453 0 .887.18 1.207.5"
      ></path>
      <path
        stroke="#000"
        className="stroke-sky-600"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
      ></path>
      <path
        stroke="#000"
        className="stroke-sky-600"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.313 17.92c-.417-1.367-.417-3.47-.001-4.838C7.57 12.233 8.298 12 9.118 12h5.764c.819 0 1.546.233 1.805 1.08.417 1.368.417 3.472 0 4.84-.259.847-.986 1.08-1.805 1.08H9.118c-.819 0-1.546-.233-1.805-1.08zM7 13.5L2 12m15 1.5l5-1.5M7 17.5L3.5 17m13.5.5l3.5-.5"
      ></path>
    </svg>
  );
}
