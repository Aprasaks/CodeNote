'use client';  // 클라이언트 전용 컴포넌트임을 명시

import StarBackground    from '../../components/StarBackground';
import ForceGraphClusters from '../../components/ForceGraphClusters';

export default function PostsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* 별 배경 */}
      <StarBackground count={100} />

      {/* 제목/설명 */}
      <div className="relative z-10 text-center pt-14">
        <h1 className="text-4xl font-bold mb-2">Capricorn</h1>
        <p className="text-gray-400 text-sm">
          책임감 있고 목표지향적이며 꾸준한 노력으로 성취를 이룬다.
        </p>
      </div>

      {/* 그래프 뷰 */}
      <div className="mt-8 z-10 w-full h-[600px] px-4">
        <ForceGraphClusters />
      </div>
    </main>
  );
}
