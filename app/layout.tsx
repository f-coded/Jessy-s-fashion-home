import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque, Great_Vibes } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  variable: "--font-dm-sans",
  display: "swap",
});

/* Main bold/display face */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  variable: "--font-bricolage",
  display: "swap",
});

/* Script face for the "Jenny's" wordmark */
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jenny's Fashion Home | Styling, Fabrics & Sewing Machines | Harrington, DE",
  description:
    "Jenny's Fashion Home in Harrington, Delaware: haute couture styling by Jenny, plus fabrics, ready-to-wear and sewing machines supplied to brands, artists and makers.",
  icons: { icon: "/assets/imgs/logo/favicon.svg" },
};

const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-bs-theme",t)}else{var d=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-bs-theme",d?"dark":"light")}}catch(e){document.documentElement.setAttribute("data-bs-theme","light")}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bricolage.variable} ${greatVibes.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
