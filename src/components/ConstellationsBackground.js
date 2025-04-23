// src/components/ConstellationsBackground.js
"use client";

import React from "react";

const CONSTELLATIONS = [
  {
    name: "염소자리",
    description: "책임감 있고 실용적이며, 목표지향적인 성격. 꾸준한 노력으로 성취를 이룹니다.",
    link: "/posts",
    top: 12,
    left: 8,
    width: 22,
    points: [
      { x: 20, y: 60 }, // 아래
      { x: 35, y: 45 },
      { x: 50, y: 50 },
      { x: 60, y: 35 },
      { x: 70, y: 45 },
      { x: 80, y: 30 }, // 끝 뿔
    ],
  },
  {
    name: "큰곰자리",
    link: "https://ko.wikipedia.org/wiki/큰곰자리",
    top: 5,
    left: 70,
    width: 15,
    points: [
      { x: 10, y: 10 },
      { x: 20, y: 30 },
      { x: 30, y: 25 },
      { x: 40, y: 45 },
      { x: 50, y: 40 },
      { x: 60, y: 60 },
    ],
  },

  {
    name: "카시오페이아자리",
    link: "https://ko.wikipedia.org/wiki/카시오페이아자리",
    top: 15,
    left: 50,
    width: 18,
    points: [
      { x: 10, y: 20 },
      { x: 25, y: 10 },
      { x: 40, y: 20 },
      { x: 55, y: 10 },
      { x: 70, y: 20 },
    ],
  },
  {
    name: "전갈자리",
    link: "https://ko.wikipedia.org/wiki/전갈자리",
    top: 40,
    left: 80,
    width: 20,
    points: [
      { x: 15, y: 10 },
      { x: 25, y: 25 },
      { x: 35, y: 20 },
      { x: 45, y: 35 },
      { x: 55, y: 30 },
      { x: 65, y: 45 },
    ],
  },
  {
    name: "백조자리",
    link: "https://ko.wikipedia.org/wiki/백조자리",
    top: 70,
    left: 20,
    width: 22,
    points: [
      { x: 10, y: 50 },
      { x: 20, y: 40 },
      { x: 30, y: 55 },
      { x: 40, y: 35 },
      { x: 50, y: 60 },
      { x: 60, y: 30 },
    ],
  },
  {
    name: "사자자리",
    link: "https://ko.wikipedia.org/wiki/사자자리",
    top: 60,
    left: 60,
    width: 18,
    points: [
      { x: 10, y: 30 },
      { x: 20, y: 15 },
      { x: 30, y: 25 },
      { x: 40, y: 10 },
      { x: 50, y: 20 },
      { x: 60, y: 5 },
    ],
  },
  {
    name: "페가수스자리",
    link: "https://ko.wikipedia.org/wiki/페가수스자리",
    top: 30,
    left: 30,
    width: 25,
    points: [
      { x: 10, y: 10 },
      { x: 25, y: 25 },
      { x: 40, y: 15 },
      { x: 55, y: 30 },
      { x: 70, y: 20 },
    ],
  },
];

export default function ConstellationsBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 dark:block hidden">
      {CONSTELLATIONS.map((c, i) => (
        <svg
          key={i}
          viewBox="0 0 100 100"
          className="absolute pointer-events-none"
          style={{
            top: `${c.top}%`,
            left: `${c.left}%`,
            width: `${c.width}vw`,
            height: "auto",
          }}
        >
          <defs>
            {/* 은은한 글로우 필터 */}
            <filter id={`glow${i}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* 별빛 원 그라디언트 */}
            <radialGradient id={`rg${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="60%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <style>{`
              @keyframes twinkle-min {
                0%,100% { opacity: 0.6; }
                50% { opacity: 0.8; }
              }
            `}</style>
          </defs>

          <a href={c.link} className="pointer-events-auto cursor-pointer">
            {/* 1) 별자리 선: 부드럽게 그라디언트로 흐려지게 */}
            {c.points.slice(1).map((p, idx) => {
              const prev = c.points[idx];
              return (
                <line
                  key={idx}
                  x1={prev.x}
                  y1={prev.y}
                  x2={p.x}
                  y2={p.y}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  filter={`url(#glow${i})`}
                />
              );
            })}

            {/* 2) 별점: circle + radialGradient + glow + 미세 twinkle */}
            {c.points.map((p, j) => (
              <circle
                key={j}
                cx={p.x}
                cy={p.y}
                r="1.4"
                fill={`url(#rg${i})`}
                filter={`url(#glow${i})`}
                className="pointer-events-auto"
                style={{
                  animation: "twinkle-min 3s ease-in-out infinite",
                }}
              />
            ))}
          </a>
        </svg>
      ))}
    </div>
  );
}
