import React from "react";
import { ModeToggle } from "@/src/components/common/theme-toggle";
import Link from "next/link";
import Wrapper from "../ui/wrapper";

const navigation = [
  { name: "Companies", href: "/companies" },
  { name: "User Details", href: "/user" },
  { name: "Log", href: "/log" },
];

const Header = () => {
  return (
    <header className="z-10 relative">
      <Wrapper>
         <nav
        aria-label="Global"
        className="flex  flex-col md:flex-row gap-4 items-center justify-between py-6"
      >
        <div className="flex">
          <Link href="/" className="block text-foreground uppercase font-semibold">VS-Emailer</Link>
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
      </Wrapper>
    </header>
  );
};

export default Header;
