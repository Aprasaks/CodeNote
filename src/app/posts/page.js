// src/app/posts/page.js

import Image from "next/image";
import Link from "next/link";
import StarBackground from "../../components/StarBackground";

// x/y + 링크를 함께 관리
const stars = [
  { x: 74, y: 28, href: "/posts/html" }, // 눈 근처 -> HTML
  { x: 73, y: 33, href: "/posts/css" }, // 뿔 위 -> CSS
  { x: 73, y: 65, href: "/posts/js" }, // 허벅지 -> JS
  { x: 73, y: 75, href: "/posts/react" }, // 무릎 -> React
  { x: 87, y: 45, href: "/posts/node" }, // 오른쪽 다리 위 -> Node
  { x: 92, y: 43, href: "/#" }, // 미정1
  { x: 92, y: 67, href: "/#" }, // 미정2
  { x: 102, y: 45, href: "/#" }, // 미정3
  { x: 106, y: 47, href: "/#" }, // 미정4
];
export default function PostsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <StarBackground />

      {/* 백그라운드 염소자리 일러스트 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/capricorn.png"
          alt="Capricorn Symbol"
          fill
          className="object-contain opacity-20 pointer-events-none"
        />
      </div>

      {/* 상단 텍스트 */}
      <div className="relative z-10 text-center pt-12">
        <h1 className="text-4xl font-bold mb-2">Capricorn</h1>
        <p className="text-gray-300 text-sm">
          책임감 있고 목표지향적이며 꾸준한 노력으로 성취를 이룬다.
        </p>
      </div>

      {/* 클릭 가능한 별자리 포인트 */}
      <div className="absolute inset-0 z-20">
        {stars.map((star, i) => (
          <Link
            key={i}
            href={star.href}
            className="absolute flex items-center justify-center w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-sm hover:blur-none hover:scale-110 transition"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
          >
            {/* 필요하면 안쪽에 아이콘이나 라벨 삽입 */}
          </Link>
        ))}
      </div>
    </main>
  );
}
