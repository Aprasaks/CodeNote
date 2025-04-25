"use client";

import React, { useState } from "react";
import Link from "next/link";

const CONSTELLATIONS = [
  {
    name: "염소자리",
    description: "책임감 있고 실용적이며, 목표지향적인 성격. 꾸준한 노력으로 성취를 이룹니다.",
    link: "/posts",
    top: 12,
    left: 8,
    width: 22,
    points: [
      { x: 20, y: 60 },
      { x: 35, y: 45 },
      { x: 50, y: 50 },
      { x: 60, y: 35 },
      { x: 70, y: 45 },
      { x: 80, y: 30 },
    ],
  },
  {
    name: "사자자리",
    description: "프로젝트",
    link: "/projects",
    top: 8,
    left: 70,
    width: 22,
    points: [
      { x: 0, y: 60 },
      { x: 15, y: 45 },
      { x: 20, y: 58 },
      { x: 50, y: 59 },
      { x: 65, y: 60 },
      { x: 75, y: 55 },
      { x: 45, y: 49 },
      { x: 40, y: 44 },
      { x: 43, y: 35 },
      { x: 55, y: 25 },
      { x: 60, y: 28 },
    ],
    connections: [
      [0, 1],
      [1, 2],
      [1, 7],
      [2, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
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
    name: "사자리",
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
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });

  return (
    <div className="pointer-events-none fixed inset-0 z-20 dark:block hidden">
      {CONSTELLATIONS.map((c, i) => (
        <Link key={i} href={c.link || "#"}>
          <svg
            viewBox="0 0 100 100"
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              top: `${c.top}%`,
              left: `${c.left}%`,
              width: `${c.width}vw`,
              height: "auto",
            }}
            onMouseEnter={(e) =>
              setTooltip({
                visible: true,
                x: e.clientX,
                y: e.clientY,
                text: `${c.name} : ${c.description || ""}`,
              })
            }
            onMouseMove={(e) => setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }))}
            onMouseLeave={() => setTooltip({ visible: false, x: 0, y: 0, text: "" })}
          >
            <defs>
              <filter id={`glow${i}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id={`rg${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="60%" stopColor="white" stopOpacity="0.3" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <style>{`
                @keyframes twinkle-min {
                  0%, 100% { opacity: 0.6; }
                  50% { opacity: 0.9; }
                }
              `}</style>
            </defs>

            {c.connections?.map(([from, to], idx) => {
              const p1 = c.points[from];
              const p2 = c.points[to];
              if (!p1 || !p2) return null;
              return (
                <line
                  key={idx}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  filter={`url(#glow${i})`}
                />
              );
            })}

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
          </svg>
        </Link>
      ))}

      {tooltip.visible && (
        <div
          className="fixed z-50 px-2 py-1 bg-white text-black text-sm rounded shadow pointer-events-none"
          style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
