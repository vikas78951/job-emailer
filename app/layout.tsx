import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/src/components/common/theme-provider";
import "./globals.css";
import Header from "@/src/components/common/header";
import { Toaster } from "@/src/components/ui/sonner";
import EmailSender from "@/src/components/common/EmailSender";

import Footer from "@/src/components/common/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VS/Emailer",
  description:
    "This application is used to send emails for different companies.",
  metadataBase: new URL("https://vs-emailer.vercel.app/"),
  openGraph: {
    title: "VS/Emailer",
    description:
      "This application is used to send emails for different companies.",
    url: "https://vs-emailer.vercel.app/",
    siteName: "VS/Emailer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VS/Emailer",
    description:
      "This application is used to send emails for different companies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistSans.variable} ${geistSans.className} antialiased bg-background relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <EmailSender />
        </ThemeProvider>
      </body>
    </html>
  );
}
