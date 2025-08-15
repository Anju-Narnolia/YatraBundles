// app/(auth)/signup/page.tsx
"use client";
import AuthCard from "@/components/AuthCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // call /api/v1/auth/send-otp
    await fetch("/api/v1/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    setLoading(false);
    setStep("otp");
  };

  const verifyOtp = async (otp: string) => {
    const res = await fetch("/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password, otp }),
    });
    if (res.ok) router.replace("/login");
    else alert("OTP invalid");
  };


  return (
    <AuthCard title="Create account" subtitle="Join YatraBundles in 30 seconds">
      <form onSubmit={requestOtp} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Phone (+91)</label>
          <input
            type="tel"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700"> Create Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-slate-500">or</span>
        </div>
      </div>

      <p className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="font-medium text-amber-600 hover:underline">
          Login
        </a>
      </p>
    </AuthCard>
  );
}