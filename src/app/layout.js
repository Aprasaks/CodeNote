// src/app/layout.js
import "./globals.css";
import StarField from "../components/StarField";
import ConstellationsBackground from "../components/ConstellationsBackground";
import ThemeToggle from "../components/ThemeToggle";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>{/* (생략) 초기 테마 스크립트 */}</head>
      <body className="bg-white dark:bg-black text-black dark:text-white min-h-screen relative">
        {/* 기존 헤더에서 토글을 제거했다면 헤더는 이렇게만 남겨도 됩니다 */}
        {/* <header className="p-4 flex justify-end">
          <ThemeToggle />
        </header> */}
        {/* 다크모드별 랜덤 별빛 */}
        {/* 다크모드별 클릭 가능한 별자리 오버레이 */}
        <ConstellationsBackground />
        <StarField count={300} />
        {/* 1) 별 전체 배경 + 은하수 밴드 */}

        <StarField
          uniformCount={150} // 전체용 별 수
          bandCount={300} // 은하수 밴드별 수
          bandStart={40} // 은하수 밴드 위치
          bandHeight={20} // 은하수 밴드 높이
        />
        {children}
        {/* ────────────────────────────────────────────── */}
        {/* 오른쪽 하단에 고정 위치로 다크모드 토글 */}
        <div
          className="
            fixed          /* 화면에 고정 */
            bottom-4       /* 화면 하단에서 1rem 위 */
            right-4        /* 화면 우측에서 1rem 왼쪽 */
            z-50           /* 다른 요소 위로 띄우기 */
          "
        >
          <ThemeToggle />
        </div>
        {/* ────────────────────────────────────────────── */}
      </body>
    </html>
  );
}
