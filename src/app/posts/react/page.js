// src/app/posts/react/page.js

export default function ReactPostsPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4">React Posts</h1>

      <ul className="space-y-3">
        <li>
          <a href="/posts/react/useeffect-deep-dive" className="text-yellow-200 hover:underline">
            useEffect 완전 정복
          </a>
        </li>
        <li>
          <a href="/posts/react/props-vs-state" className="text-yellow-200 hover:underline">
            Props vs State, 언제 써야 해?
          </a>
        </li>
      </ul>
    </main>
  );
}
