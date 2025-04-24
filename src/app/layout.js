"use client";

import "./globals.css";
import StarField from "../components/StarField";
import ConstellationsBackground from "../components/ConstellationsBackground";
import ThemeToggle from "../components/ThemeToggle";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Script from "next/script";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");

  // ✅ 다크모드 상태 감지
  useEffect(() => {
    const html = document.documentElement;
    const stored = localStorage.getItem("theme");

    // ✅ 사용자가 직접 dark 저장한 게 아닌 이상 무조건 라이트
    if (stored === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark"); // 🤍 무조건 라이트
      localStorage.setItem("theme", "light"); // 🎯 기본 테마 강제 저장
    }

    // ✅ 다크모드 클래스 변경 감지
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <html lang="ko">
      <head>
        {/* ✅ GA: Next.js 권장 방식 적용 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GTKFS9NEH6"
          strategy="afterInteractive"
        />
        <Script
          id="ga-gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-GTKFS9NEH6');
      `,
          }}
        />
      </head>
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
        <StarField count={80} />
        <StarField uniformCount={50} bandCount={80} bandStart={40} bandHeight={20} />

        {children}

        {/* 🌑 다크모드용 일반 토글 */}
        <div className="hidden dark:block fixed bottom-4 right-4 z-50">
          <ThemeToggle />
        </div>
      </body>
    </html>
  );
}
