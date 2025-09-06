// app/(auth)/signup/page.tsx
"use client";
import AuthCard from "@/components/AuthCard";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      //send request to backend
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful ✅");
        router.push("/"); // redirect to login
      } else {
        alert(data.error || "Signup failed ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Create account" subtitle="Join YatraBundles">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className=" px-2 py-1 w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="px-2 py-1 mb-1 block text-sm font-medium text-slate-700">Register As</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full py-1.5 px-2 rounded-md border border-slate-300 shadow-sm  bg-white outline-none"
          >
            <option >Select</option>
            <option value="traveler" className="px-2 py-1">Traveler</option>
            <option value="hotel_owner" className="px-2 py-1">Hotel Owner</option>
            <option value="driver" className="px-2 py-1">Driver</option>
            <option value="guide" className="px-2 py-1">Guide</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-2 py-1  rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
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
            className="w-full px-2 py-1  rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
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
            className="w-full px-2 py-1  rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full  rounded-md bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-60"
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