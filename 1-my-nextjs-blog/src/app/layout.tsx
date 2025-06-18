import { Roboto } from "next/font/google";
import "../styles/globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navlinks = [
    {
      label: "HOME",
      to: "/",
    },
    {
      label: "ABOUT",
      to: "about",
    },
    {
      label: "BLOG",
      to: "blog",
    },
    {
      label: "CONTACT",
      to: "contact",
    },
  ];
  const name = "Naos";
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <NavBar logoName={name} links={navlinks} />
        <main>{children}</main>
        <Footer name={name} />
      </body>
    </html>
  );
}
