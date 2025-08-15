// app/(auth)/login/page.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AuthCard from "@/components/AuthCard";
export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCredentials = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        // const res = await signIn("credentials", {
        //   email,
        //   password,
        //   redirect: false,
        // });
        // if (res?.ok) router.replace(callbackUrl);
        // else setError(res?.error || "Login failed");
        setLoading(false);
    };

    return (

        <AuthCard title="Welcome back" subtitle="Login to your account">
            <form onSubmit={handleCredentials} className="space-y-4">
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
                    <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
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

            {/* <GoogleButton /> */}

            <p className="mt-6 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="font-medium text-amber-600 hover:underline">
                    Sign up
                </a>
            </p>
        </AuthCard>
    );
}