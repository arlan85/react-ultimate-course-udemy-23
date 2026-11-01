import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import Header from "./_components/Header";

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
      <body
        className={`${josefinSans.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1">
          <main className="max-w-7xl mx-auto px-8 py-12">{children}</main>
        </div>
        <footer className="p-12 text-center">
          {new Date().getFullYear()} Copyright by The Wild Oasis Inc.
        </footer>
      </body>
    </html>
  );
}
