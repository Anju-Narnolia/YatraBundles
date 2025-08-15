// components/layout/Footer.tsx
import Link from "next/link";
// import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

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
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              {/* <Image
                src="/logo-white.png"
                alt="YatraBundles"
                width={32}
                height={32}
              /> */}
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
  );
}