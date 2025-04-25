"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// ✅ 이 방식으로 동적으로 불러와야 에러 안 남
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => <p className="text-white">🧠 그래프 로딩 중...</p>,
});

export default function GraphClient({ nodes, links }) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">🌌 React 그래프 보기</h1>
      <div className="h-[600px] bg-zinc-900 rounded-lg">
        <ForceGraph2D
          graphData={{ nodes, links }}
          nodeLabel="id"
          nodeAutoColorBy="group"
          linkDirectionalParticles={2}
          linkDirectionalArrowLength={4}
          linkColor={() => "rgba(255,255,255,0.3)"}
          backgroundColor="#0f0f0f"
          onNodeClick={(node) => {
            const slug = node.id.toLowerCase().replace(/\s+/g, "-");
            router.push(`/posts/react/${slug}`);
          }}
        />
      </div>
    </main>
  );
}
