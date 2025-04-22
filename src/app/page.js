// src/app/page.js
import StarField from "../components/StarField";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white px-4">
      {/* 첫 페이지만 별 애니메이션 */}
      <StarField count={80} />

      <h1 className="font-movesans text-6xl font-bold mb-4">Hi~ I am still Studying</h1>
      <hr className="w-1/3 border-t-2 border-gray-400 dark:border-gray-600 mb-4" />
      <p className="font-komi text-2xl">오늘은 어제보다 하나 더 알아갑니다</p>
    </main>
  );
}
