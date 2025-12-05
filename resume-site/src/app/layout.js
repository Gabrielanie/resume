import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gabriel Udoh | Software Developer",
  description: "Portfolio of Gabriel Udoh, a Full Stack Software Developer specializing in React, Next.js, and Node.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
