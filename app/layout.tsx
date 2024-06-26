import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import ReactQueryProvider from './components/ReactQueryProvider';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Alert from "./components/Alert";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amazon Bookstore",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-white h-full`}>
        <ReactQueryProvider>
          <main className="flex min-h-screen flex-col bg-white w-full">
            <Header />
            <div className="flex-grow max-h-[100%] overflow-y-auto pb-40 md:pb-20">
              {children}
              <ReactQueryDevtools />
            </div>
          </main>
          <Alert/>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
