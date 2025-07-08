import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Messages Management System",
  description:
    "A message board management system based on Next.js (App Router architecture), combined with Prisma ORM and PostgreSQL (can be changed to SQLite). Front-end users can register, log in, and post messages, and back-end administrators can log in, browse, edit, and delete all user messages.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
