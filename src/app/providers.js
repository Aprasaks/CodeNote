// src/app/providers.js
"use client";
import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      defaultTheme="system"
      enableColorScheme={false} // ← 이걸 추가!
    >
      {children}
    </ThemeProvider>
  );
}
