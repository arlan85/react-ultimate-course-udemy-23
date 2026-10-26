import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation ";

import "@/app/_styles/globals.css";

export const metadata = {
  // title: "The wild Oasis",
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by stunning mountains and dark forests",
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
