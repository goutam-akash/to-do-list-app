// app/layout.tsx
import React, { ReactNode } from "react";
import "./globals.css";

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
        <div
          style={{
            padding: "20px",
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h1>Todo List</h1>
          {children}
        </div>
      </body>
    </html>
  );
};

export default MainLayout;
