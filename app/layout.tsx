import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";

const geist = localFont({
  src: [
    { path: "./fonts/Geist-Light.ttf", weight: "300" },
    { path: "./fonts/Geist-Regular.ttf", weight: "400" },
    { path: "./fonts/Geist-Medium.ttf", weight: "500" },
    { path: "./fonts/Geist-SemiBold.ttf", weight: "600" },
    { path: "./fonts/Geist-Bold.ttf", weight: "700" },
  ],
  variable: "--font-geist",
  display: "swap",
});

const title = "Zend · Cash that works anywhere";
const description =
  "Social, borderless and as easy as a text. Hand it to a name, drop it in a chat or leave it as a link. It lands in their currency, wherever they are. Free between people.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  openGraph: { title, description, url: site.url, siteName: "Zend", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#F2F1ED",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The inline script below adds `js` to <html> before React loads, on purpose, so the
    // class differs from the server render. suppressHydrationWarning covers only this
    // element's own attributes, not anything inside it.
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        {/* Reveal animations only hide content once we know JS is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
