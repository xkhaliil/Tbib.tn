import React from "react";

import { SearchIcon } from "lucide-react";

export function SearchButton() {
  return (
    <button className="flex w-full items-center gap-x-2.5 rounded-full border bg-secondary px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-secondary/80 md:max-w-lg">
      <SearchIcon className="h-4 w-4 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        Insert a command or search for something...
      </p>
      <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-sans text-[10px] font-medium text-muted-foreground">
        <span>CTRL</span>K
      </kbd>
    </button>
  );
}
