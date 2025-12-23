"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: " Home " },
  { href: "/chat", label: " Chat " },
  { href: "/admin", label: " Upload " },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 backdrop-blur">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold text-primary-700 dark:text-primary-300"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-md bg-primary-700/10">
            <Image
              src="/logo.jpg"
              alt="Kenmark ITan Solutions"
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </div>
          <span>Kenmark ITan Solutions</span>
        </Link>
        <nav className="flex items-center gap-3 md:gap-5 whitespace-nowrap">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
                  active
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100"
                    : "text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

