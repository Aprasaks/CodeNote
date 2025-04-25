"use client";

import Link from "next/link";
import StarBackground from "../../components/StarBackground";

// ✅ label 추가!
const starLinks = [
  { id: 1, label: "HTML", top: "20%", left: "30%", href: "/posts/html" },
  { id: 2, label: "CSS", top: "35%", left: "55%", href: "/posts/css" },
  { id: 3, label: "JavaScript", top: "50%", left: "20%", href: "/posts/javascript" },
  { id: 4, label: "React", top: "60%", left: "60%", href: "/posts/react" },
  { id: 5, label: "Next.js", top: "25%", left: "75%", href: "/posts/nextjs" },
  { id: 6, label: "미정1", top: "45%", left: "40%", href: "/posts/post-6" },
  { id: 7, label: "미정2", top: "70%", left: "30%", href: "/posts/post-7" },
  { id: 8, label: "미정3", top: "75%", left: "65%", href: "/posts/post-8" },
  { id: 9, label: "미정4", top: "85%", left: "45%", href: "/posts/post-9" },
];

export default function PostsPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <StarBackground count={200} />

      {/* 상단 텍스트 */}
      <div className="relative z-10 text-center pt-14">
        <h1 className="text-4xl font-bold mb-2">Capricorn</h1>
        <p className="text-gray-400 text-sm">
          책임감 있고 목표지향적이며 꾸준한 노력으로 성취를 이룬다.
        </p>
      </div>

      {/* 클릭 가능한 별들 */}
      {starLinks.map((star) => (
        <div
          key={star.id}
          className="absolute z-20 rounded-full transition-transform duration-300 hover:scale-125 group"
          style={{
            top: star.top,
            left: star.left,
            width: "12px",
            height: "12px",
            backgroundColor: "#fdf6d3",
            opacity: 0.8,
            boxShadow: "0 0 8px 4px rgba(255, 255, 200, 0.4)",
            animation: "twinkle 4s ease-in-out infinite",
          }}
        >
          <Link href={star.href} aria-label={star.label} className="block w-full h-full" />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-white text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {star.label}
          </div>
        </div>
      ))}
    </main>
  );
}
