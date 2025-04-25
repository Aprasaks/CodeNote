// src/app/projects/page.js
export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">💫 나의 프로젝트</h1>
      <p className="text-gray-400 mb-4">사자자리에서 연결된 프로젝트들을 소개합니다.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* 💡 여기에 카드 형태로 프로젝트를 보여줄 수 있어! */}
        <div className="bg-zinc-800 p-6 rounded-xl shadow hover:bg-zinc-700 transition">
          <h2 className="text-xl font-semibold">CodeNote</h2>
          <p className="text-sm text-gray-400 mt-2">나만의 개발 기록 우주 공간 ✨</p>
        </div>
      </div>
    </main>
  );
}
