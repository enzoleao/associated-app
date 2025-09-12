// app/auth/layout.tsx
import React, { ReactNode } from "react";
import AuthenticationFormLayout from "./layouts/AuthenticationFormLayout";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AuthenticationFormLayout>
      {children}
    </AuthenticationFormLayout> 
  );
}
