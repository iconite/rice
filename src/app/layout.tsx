import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google"; // Import both fonts
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat", // Define CSS variable
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // Define CSS variable
});

export const metadata: Metadata = {
  title: {
    default: "Iconite Earth - Global Export & Delivery",
    template: "%s | Iconite Earth"
  },
  description: "Serving customers worldwide with JDC shipping and consistent quality that meets international standards.",
  keywords: ["export", "shipping", "spices", "rice", "global trade", "agriculture"],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Iconite Earth'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
