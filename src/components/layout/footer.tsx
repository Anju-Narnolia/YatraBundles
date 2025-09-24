// components/layout/Footer.tsx
"use client"
import Link from "next/link";
import { signIn, useSession } from "next-auth/react"
import { Button } from "../ui/button";

export default function Footer() {

  const year = new Date().getFullYear();
  const { data: session, status } = useSession();

  if (status === "loading") return null
  const company = [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ];

  const support = [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Refund Policy", href: "/refund" },
  ];

  const social = [
    { label: "Twitter", href: "https://twitter.com/yatrabundles" },
    { label: "Instagram", href: "https://instagram.com/yatrabundles" },
    { label: "YouTube", href: "https://youtube.com/@yatrabundles" },
  ];

  return (
    <>
      <section className="flex flex-col justify-center items-center text-center py-20 bg-orange-500 mt-10">
        <h2 className="text-3xl font-bold text-white">Ready to travel?</h2>
        {!session ? (
          <>
            <p className="mt-4 text-lg text-slate-100">
              ✨ Start your journey today! Sign up and get an instant <strong>10% discount</strong>
              on your first booking.
            </p>
            <div className="gap-2 flex justify-center py-5">
              <Link href="/login">
                <Button onClick={() => signIn()}>Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </>) : (
          <>
            <p className="mt-4 text-lg text-slate-100">
              ✨ Choose your dream place and book your room now.</p>
            <div className="flex p-3 gap-3">
              <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                <Link href="/destinations" className="gap-2 flex justify-center py-5">
                  Destination
                </Link>
              </Button>
              <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                <Link href="#featured-destinations">Browse Bundles</Link>
              </Button></div>
          </>)}
      </section>
      <footer className="bg-slate-900 text-slate-300">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center space-x-2">

                <span className="text-lg font-bold text-white">YatraBundles</span>
              </Link>
              <p className="mt-3 text-sm text-slate-400">
                Pilgrimage bundles made simple.
              </p>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                {company.map((c) => (
                  <li key={c.label}>
                    <Link
                      href={c.href}
                      className="text-sm text-slate-400 hover:text-white"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Support
              </h3>
              <ul className="mt-4 space-y-2">
                {support.map((s) => (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      className="text-sm text-slate-400 hover:text-white"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Follow us
              </h3>
              <ul className="mt-4 space-y-2">
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-400 hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-700 pt-8 md:flex md:items-center md:justify-between">
            <p className="text-sm text-slate-400">
              &copy; {year} YatraBundles OPC Pvt. Ltd. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link href="/privacy" className="text-sm text-slate-400 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-slate-400 hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}