import React from "react";
import { ModeToggle } from "@/src/components/common/theme-toggle";
import Link from "next/link";

const navigation = [
  { name: "Companies", href: "/companies" },
  { name: "User Details", href: "/user" },
  { name: "Log", href: "/log" },
];

const Header = () => {
  return (
    <header className="z-10 relative">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex">
          <Link href="/" className="block text-foreground uppercase font-semibold">Emailer</Link>
        </div>

        <div className="flex gap-x-2 md:gap-x-4 lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-foreground/70 cursor-pointer hover:text-foreground "
            >
              {item.name}
            </Link>
          ))}
          <ModeToggle />
        </div>
        
      </nav>
    </header>
  );
};

export default Header;
