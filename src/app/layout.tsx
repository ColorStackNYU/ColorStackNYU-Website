import type { Metadata } from "next";
import { ThemeProvider } from "../context/ThemeContext";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "ColorStackNYU",
  description: "Website for everything ColorStackNYU",
  icons: {
    icon: "/logo_round.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
