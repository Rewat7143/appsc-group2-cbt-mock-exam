import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APPSC Group 2 Mains CBT Mock Examination Portal",
  description: "Official pattern Computer-Based Mock Examination for APPSC Group 2 Services with complete TCS iON CBT interface and verified answer keys.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
