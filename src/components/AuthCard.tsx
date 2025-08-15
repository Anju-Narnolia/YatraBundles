// components/auth/AuthCard.tsx
"use client";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthCard({ children, title, subtitle }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-md:max-w-sm max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}