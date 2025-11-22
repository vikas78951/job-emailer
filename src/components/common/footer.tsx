"use client";

import React from "react";
import { Github, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border py-4 text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <p>
          © {new Date().getFullYear()} Emailer — Built by Vikas.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="mailto:vikass78951@gmail.com"
            className="hover:text-foreground flex items-center gap-1"
          >
            <Mail size={16} /> Contact
          </Link>
          <Link
            href="https://github.com/vikas78951/job-emailer"
            target="_blank"
            className="hover:text-foreground flex items-center gap-1"
          >
            <Github size={16} /> GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
