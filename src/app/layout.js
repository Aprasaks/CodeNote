"use client";

import "./globals.css";
import StarField from "../components/StarField";
import ConstellationsBackground from "../components/ConstellationsBackground";
import ThemeToggle from "../components/ThemeToggle";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");

  // ✅ 다크모드 상태 감지
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (stored === "dark" || (!stored && prefersDark)) {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    // ✅ 다크모드 클래스 변경 감지
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <html lang="ko">
      <head>{/* (생략) */}</head>
      <body className="bg-white dark:bg-black text-black dark:text-white min-h-screen relative">
        {/* 🌌 별자리 배경 (홈에서만 / 다크모드에서만 fade-in) */}
        {pathname === "/" && (
          <ConstellationsBackground
            className={`transition-opacity duration-1000 ease-in-out absolute inset-0 z-10 
              ${theme === "dark" ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
          />
        )}

        {/* 🌙 라이트모드 안내 문구 + 큰 달 토글 */}
        {pathname === "/" && (
          <>
            <div className="dark:hidden fixed bottom-28 left-1/2 -translate-x-1/2 z-40 text-center">
              <p className="text-4xl  text-black font-['MoveSans-Bold']">
                The stars in the night sky know everything.
              </p>
              <p className="mt-3 text-xl text-black font-['KNPSKkomi-Regular00']">
                별을 보기위해 달을 띄워주세요
              </p>
            </div>

            <div className="dark:hidden fixed bottom-8 right-8 z-50">
              <ThemeToggle bigMoon={true} />
            </div>
          </>
        )}

        {/* ✨ 항상 보이는 별 배경 */}
        <StarField count={300} />
        <StarField uniformCount={150} bandCount={300} bandStart={40} bandHeight={20} />

        {children}

        {/* 🌑 다크모드용 일반 토글 */}
        <div className="hidden dark:block fixed bottom-4 right-4 z-50">
          <ThemeToggle />
        </div>
      </body>
    </html>
  );
}
