import { Bricolage_Grotesque, Nunito } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const corpo = Nunito({
  subsets: ["latin"],
  variable: "--font-corpo",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Un oggetto racconta l'estate",
  description:
    "Le storie dei bambini sugli oggetti che ricordano l'estate, raccontate in audio e qr code.",
  keywords: [
    "estate",
    "audio bambini",
    "qr code",
    "progetto scolastico",
    "racconti estivi",
  ],
  openGraph: {
    title: "Un oggetto racconta l'estate",
    description:
      "Le storie dei bambini sugli oggetti che ricordano l'estate, raccontate in audio.",
    url: "https://example.com",
    siteName: "Un oggetto racconta l'estate",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Un oggetto racconta l'estate",
    description:
      "Le storie dei bambini sugli oggetti che ricordano l'estate, raccontate in audio.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${display.variable} ${corpo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
