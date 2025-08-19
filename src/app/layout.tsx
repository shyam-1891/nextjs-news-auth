import type { Metadata } from "next";

// Add any google fonts here
import { Noto_Sans } from 'next/font/google';
const notoSans = Noto_Sans({
  subsets: ['latin'], // Specify required subsets
  weight: ['400', '500', '700'], // Specify desired weights
  display: 'swap', // Recommended for better performance
  variable: '--font-noto-sans', // Optional: for use with Tailwind CSS
});

import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "NextLearn",
  description: "NextLearn is a platform for learning Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={notoSans.className}>
      <body
        className={`${notoSans.className} antialiased`}
      >
        <Header />
        <main className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
