"use client";

import { useEffect, useState } from "react";
import StarField from "../components/StarField"; // ✅ 꼭 추가해줘야 함

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      const isDark = html.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setHasMounted(true);
    return () => observer.disconnect();
  }, []);

  if (!hasMounted) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white px-4 relative overflow-hidden">
      <StarField uniformCount={40} bandCount={60} />

      <div
        className={`
          transition-all duration-1000 ease-out transform
          ${theme === "dark" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <h1 className="font-movesans text-6xl font-bold mb-4">Hi~ I am still Studying</h1>
        <hr className="w-1/3 border-t-2 border-gray-400 dark:border-gray-600 mb-4" />
        <p className="font-komi text-2xl">오늘은 어제보다 하나 더 알아갑니다</p>
      </div>
    </main>
  );
}
