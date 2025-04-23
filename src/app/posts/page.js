// src/app/posts/page.js
import Image from "next/image";
import StarBackground from "../../components/StarBackground";

const stars = [
  { x: 34, y: 28 }, // 1
  { x: 33, y: 33 }, // 2
  { x: 33, y: 65 }, // 3
  { x: 33, y: 75 }, // 4
  { x: 47, y: 45 }, // 5
  { x: 52, y: 43 }, // 6
  { x: 52, y: 67 }, // 7
  { x: 62, y: 45 }, // 8
  { x: 66, y: 47 }, // 9
];

export default function PostsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <StarBackground />

      {/* 염소자리 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/capricorn.png"
          alt="Capricorn Symbol"
          width={700}
          height={700}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
        />
      </div>

      {/* 설명 텍스트 */}
      <div className="relative z-10 text-center pt-12">
        <h1 className="text-4xl font-bold mb-2">Capricorn</h1>
        <p className="text-gray-300 text-sm">
          책임감 있고 목표지향적이며 꾸준한 노력으로 성취를 이룬다.
        </p>
      </div>

      {/* 반짝이는 별들 */}
      <div className="absolute inset-0 z-10">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white opacity-90 blur-sm animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        ))}
      </div>
    </main>
  );
}
