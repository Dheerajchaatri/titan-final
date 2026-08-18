import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { ChatWidget } from "@/components/global/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3001"),
  title: {
    default: "TITAN - AI Powered Job Portal | Find Jobs in Pakistan",
    template: "%s | TITAN Job Portal",
  },
  description: "Taj Institute of Technology & Applied Networks (TITAN) - Pakistan's smartest AI job matching portal. Find verified jobs, analyze resumes with AI, and connect with top employers.",
  keywords: [
    "Jobs in Pakistan",
    "IT Jobs Pakistan",
    "Software Engineer Jobs",
    "AI Job Matching",
    "TITAN Job Portal",
    "Remote Jobs",
    "Lahore Jobs",
    "Karachi Jobs",
    "Islamabad Jobs",
  ],
  authors: [{ name: "TITAN" }],
  creator: "Taj Institute of Technology & Applied Networks",
  publisher: "TITAN Job Portal",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TITAN - AI Powered Job Portal | Find Jobs in Pakistan",
    description: "Pakistan's smartest AI job matching portal. Search thousands of active jobs and analyze your resume with AI.",
    url: "http://localhost:3001/",
    siteName: "TITAN Job Portal",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        {children}
        <ChatWidget />
        <ToastProvider />
      </body>
    </html>
  );
}
