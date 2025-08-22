// components/layout/Header.tsx
"use client";

import Link from "next/link";
// import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Destinations", href: "/destinations" },
        { label: "Bundles", href: "/bundles" },
        { label: "About", href: "/about" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="hidden text-xl font-bold text-amber-700 sm:inline">
                        YatraBundles
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex md:space-x-8">
                    {navLinks.map((l) => (
                        <Link
                            key={l.label}
                            href={l.href}
                            className="text-sm font-medium text-slate-700 hover:text-amber-600"
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>

                {/* Auth buttons */}
                <div className="hidden md:flex md:items-center md:space-x-4">
                    {session ? (
                        <div className="relative group">
                            <button className="flex items-center space-x-1 text-sm font-medium text-slate-700 hover:text-amber-600">
                                <span>Hi, {session.user?.name || "Guest"}</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            <div className="absolute right-0 mt-2 hidden w-40 bg-white rounded-md shadow-lg ring-1 ring-slate-200 group-hover:block">
                                <Link
                                    href="/trips"
                                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                >
                                    My Trips
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <button
                                    onClick={() => signIn("google")}
                                    className="text-sm font-medium text-slate-700 hover:text-amber-600"
                                >
                                    Login
                                </button></Link>
                            <Link href="/signup">
                                <button
                                    onClick={() => signIn("google")}
                                    className="rounded-md bg-amber-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
                                >
                                    Register
                                </button></Link>
                        </>
                    )}
                </div>

                {/* Mobile menu button */}
                <div className="flex md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-slate-700"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden">
                    <nav className="space-y-1 px-4 pb-4">
                        {navLinks.map((l) => (
                            <Link
                                key={l.label}
                                href={l.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100"
                            >
                                {l.label}
                            </Link>
                        ))}
                        {session ? (
                            <>
                                <Link
                                    href="/trips"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100"
                                >
                                    My Trips
                                </Link>
                                <button
                                    onClick={() => {
                                        signOut();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-slate-700 hover:bg-slate-100"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    signIn("google");
                                    setMobileMenuOpen(false);
                                }}
                                className="block w-full rounded-md bg-amber-600 px-3 py-2 text-left text-base font-medium text-white"
                            >
                                Login / Register
                            </button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}