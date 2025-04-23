"use client";

import "./globals.css";
import StarField from "../components/StarField";
import ConstellationsBackground from "../components/ConstellationsBackground";
import ThemeToggle from "../components/ThemeToggle";
import { usePathname } from "next/navigation"; // 경로 확인용

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="ko">
      <head>{/* (생략) 초기 테마 스크립트 */}</head>
      <body className="bg-white dark:bg-black text-black dark:text-white min-h-screen relative">
        {/* 다크모드별 클릭 가능한 별자리 오버레이: 홈에서만 보여줌 */}
        {pathname === "/" && <ConstellationsBackground />}

        {/* 별 배경은 전체 페이지에 유지 */}
        <StarField count={300} />
        <StarField uniformCount={150} bandCount={300} bandStart={40} bandHeight={20} />

        {children}

        {/* 오른쪽 하단 다크모드 토글 */}
        <div
          className="
            fixed
            bottom-4
            right-4
            z-50
          "
        >
          <ThemeToggle />
        </div>
      </body>
    </html>
  );
}
