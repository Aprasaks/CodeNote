// src/components/StarField.js
"use client";

import { useEffect, useState } from "react";

export default function StarField({
  uniformCount = 100, // 전체용 별 개수
  bandCount = 200, // 은하수 밴드용 별 개수
  bandStart = 40, // 밴드 시작(%) - 화면 높이
  bandHeight = 20, // 밴드 높이(%)
}) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const arr = [];

    // 1) 전체 배경용 별 (고르게 분포)
    for (let i = 0; i < uniformCount; i++) {
      const size = 0.5 + Math.random() * 1.5;
      const brightness = 0.5 + Math.random() * 0.5;
      arr.push({
        top: Math.random() * 100, // 0~100%
        left: Math.random() * 100,
        size,
        brightness,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      });
    }

    // 2) 은하수 밴드용 별 (밴드 내 집중 분포)
    for (let i = 0; i < bandCount; i++) {
      const size = 0.5 + Math.random() * 1.5;
      const brightness = 0.6 + Math.random() * 0.4;
      arr.push({
        top: bandStart + Math.random() * bandHeight, // bandStart~bandStart+bandHeight
        left: Math.random() * 100,
        size,
        brightness,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      });
    }

    setStars(arr);
  }, [uniformCount, bandCount, bandStart, bandHeight]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 dark:block hidden">
      {stars.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.brightness,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
