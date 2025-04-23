// src/components/ConstellationsBackground.js
"use client";

import React from "react";

const CONSTELLATIONS = [
  {
    name: "오리온자리",
    link: "https://ko.wikipedia.org/wiki/오리온자리",
    top: 10,
    left: 5,
    width: 20,
    points: [
      { x: 10, y: 10 },
      { x: 30, y: 25 },
      { x: 50, y: 20 },
      { x: 65, y: 35 },
      { x: 50, y: 50 },
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
            <filter id={`glowFilter${i}`}>
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <style>{`
              @keyframes twinkle {
                0%,100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
              @keyframes lineFade {
                0%,100% { stroke-opacity: 0.2; }
                50% { stroke-opacity: 0.5; }
              }
            `}</style>
          </defs>

          <a
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto cursor-pointer"
          >
            <polyline
              points={c.points.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#fff"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#glowFilter${i})`}
              style={{
                animation: "lineFade 4s ease-in-out infinite",
                strokeDasharray: "1,3",
              }}
              className="pointer-events-auto"
            />

            {c.points.map((p, j) => (
              <polygon
                key={j}
                points={`
                  ${p.x},${p.y - 1.5}
                  ${p.x + 0.5},${p.y}
                  ${p.x + 1.5},${p.y}
                  ${p.x + 0.75},${p.y + 0.5}
                  ${p.x + 1},${p.y + 1.5}
                  ${p.x},${p.y + 1}
                  ${p.x - 1},${p.y + 1.5}
                  ${p.x - 0.75},${p.y + 0.5}
                  ${p.x - 1.5},${p.y}
                  ${p.x - 0.5},${p.y}
                `}
                fill="#fff"
                filter={`url(#glowFilter${i})`}
                style={{
                  animation: "twinkle 3s ease-in-out infinite",
                }}
                className="pointer-events-auto"
              />
            ))}
          </a>
        </svg>
      ))}
    </div>
  );
}
