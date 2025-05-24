import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/src/components/common/theme-provider";
import { Providers } from "@/src/lib/provider";
import "./globals.css";
import Header from "@/src/components/common/header";

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
          <Header />
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
