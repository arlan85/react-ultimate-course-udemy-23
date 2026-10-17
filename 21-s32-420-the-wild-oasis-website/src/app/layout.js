import Logo from "./components/Logo";
import Navigation from "./components/Navigation ";

export const metadata = {
  title: "The wild Oasis",
  description: "The wild Oasis page content",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
