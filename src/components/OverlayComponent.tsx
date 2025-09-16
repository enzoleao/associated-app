"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, message }) => {
  return isLoading ? (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center",
        "bg-black bg-opacity-50 backdrop-blur-sm",
        "transition-opacity duration-300",
        "z-[9999]"
      )}
    >
      <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
      {message && (
        <span className="mt-4 text-white text-lg font-medium">{message}</span>
      )}
    </div>
  ) : null;
};
