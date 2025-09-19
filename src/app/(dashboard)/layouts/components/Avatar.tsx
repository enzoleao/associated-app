"use client";

import * as React from "react";

export function Avatar({ initials, color }: { initials?: string; color: string | null | undefined }) {
  return (
    <div 
      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold select-none cursor-pointer"
      style={{backgroundColor: color ?? '#808080'}}
      >
      {initials}
    </div>
  );
}
