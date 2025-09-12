// app/auth/layout.tsx
import React, { ReactNode } from "react";
import DashboardLayout from "./layouts/DashboardLayout";

interface DashboardLayouProps {
  children: ReactNode;
}

export default function Layout({ children }: DashboardLayouProps) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout> 
  );
}
