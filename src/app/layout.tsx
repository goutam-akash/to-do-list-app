<<<<<<< HEAD
// app/layout.tsx

import React, { ReactNode } from 'react';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Todo List</title>
        <meta name="description" content="A simple Todo List app" />
      </head>
      <body>
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h1>Todo List</h1>
          {children}
        </div>
      </body>
    </html>
  );
};

export default MainLayout;
=======
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "To-Do-List App",
  description: "Your Personal Task Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
>>>>>>> 49918b91c11b512ebc26dd6b9c9bbcc282732675
