import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation ";

import "@/app/_styles/globals.css";

export const metadata = {
  title: "The wild Oasis",
  description: "The wild Oasis page content",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>
          {new Date().getFullYear()} Copyright by The Wild Oasis Inc.
        </footer>
      </body>
    </html>
  );
}
