// src/app/posts/css/page.js

export default function CssPostsPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">CSS Posts</h1>
      <p className="text-gray-400">CSS와 관련된 포스트들을 모아둔 페이지입니다.</p>

      {/* 예시 카드 또는 리스트 */}
      <div className="mt-8 space-y-4">
        <div className="p-4 bg-zinc-800 rounded-lg shadow hover:bg-zinc-700 transition">
          <h2 className="text-2xl font-semibold">CSS Flexbox 완전정복</h2>
          <p className="text-gray-400 text-sm mt-1">Flexbox의 기본 개념과 실습 예제</p>
        </div>

        <div className="p-4 bg-zinc-800 rounded-lg shadow hover:bg-zinc-700 transition">
          <h2 className="text-2xl font-semibold">Grid 레이아웃 쉽게 배우기</h2>
          <p className="text-gray-400 text-sm mt-1">2차원 레이아웃의 핵심을 정리한 포스트</p>
        </div>
      </div>
    </main>
  );
}
