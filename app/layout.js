import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'

import "./globals.css";

import ModalProvider from "@/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin",
  description: "Advanced Engineering Project Group 15",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}