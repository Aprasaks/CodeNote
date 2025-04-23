import Link from "next/link";
import StarBackground from "../../components/StarBackground";

const techStars = [
  { label: "HTML", href: "/posts/html", x: 34, y: 10 },
  { label: "CSS", href: "/posts/css", x: 33, y: 30 },
  { label: "JS", href: "/posts/js", x: 28, y: 50 },
  { label: "React", href: "/posts/react", x: 30, y: 70 },
  { label: "Node", href: "/posts/node", x: 28, y: 82 },
  { label: "미정1", href: "#", x: 40, y: 85 },
  { label: "미정2", href: "#", x: 92, y: 90 },
  { label: "미정3", href: "#", x: 62, y: 55 },
  { label: "미정4", href: "#", x: 52, y: 35 },
];

export default function PostsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <StarBackground />

      {/* 설명 텍스트 상단 */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 text-center">
        <h1 className="text-4xl font-bold mb-2">Capricorn</h1>
        <p className="text-gray-400 text-sm">
          책임감 있고 목표지향적이며 꾸준한 노력으로 성취를 이룬다.
        </p>
      </div>

      {/* 별자리 + 별모양 링크 */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="relative w-[700px] h-[700px]">
          {/* 선 연결 SVG */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {techStars.map((curr, i) => {
              const next = techStars[i + 1];
              if (!next) return null;
              return (
                <line
                  key={i}
                  x1={curr.x}
                  y1={curr.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="white"
                  strokeWidth="0.5"
                />
              );
            })}

            {/* 마지막 → 첫 번째 선 추가 */}
            <line
              x1={techStars[techStars.length - 1].x}
              y1={techStars[techStars.length - 1].y}
              x2={techStars[0].x}
              y2={techStars[0].y}
              stroke="white"
              strokeWidth="0.5"
            />
          </svg>

          {/* 별자리 점을 별모양 링크로 표시 */}
          {techStars.map((star, i) => (
            <Link
              key={i}
              href={star.href}
              className="absolute text-xs text-white hover:scale-110 transition-all"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex flex-col items-center">
                <div className="text-lg animate-pulse">★</div>
                <span className="text-[10px] mt-1">{star.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
