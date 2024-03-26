import React from "react";

import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-x-2">
      <Image src="/images/lock.png" width="50" height="50" alt="Lock" />
      <h1 className="text-4xl font-extrabold">Auth Toolkit</h1>
    </div>
  );
}
