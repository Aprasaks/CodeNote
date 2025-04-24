"use client";

import { useEffect, useState } from "react";

export default function StarField({
  uniformCount = 100,
  bandCount = 200,
  bandStart = 40,
  bandHeight = 20,
}) {
  const [stars, setStars] = useState(null); // 🚫 초기값 null로 해서 서버 렌더링에 별 안 만들기

  useEffect(() => {
    const arr = [];

    // 전체용 별 생성
    for (let i = 0; i < uniformCount; i++) {
      const size = 0.5 + Math.random() * 1.5;
      const brightness = 0.5 + Math.random() * 0.5;
      arr.push({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size,
        brightness,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      });
    }

    // 은하수용 별 생성
    for (let i = 0; i < bandCount; i++) {
      const size = 0.5 + Math.random() * 1.5;
      const brightness = 0.6 + Math.random() * 0.4;
      arr.push({
        top: bandStart + Math.random() * bandHeight,
        left: Math.random() * 100,
        size,
        brightness,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      });
    }

    setStars(arr);
  }, [uniformCount, bandCount, bandStart, bandHeight]);

  // ⭐ 서버에서는 렌더링하지 않음 (hydration mismatch 방지)
  if (!stars) return null;

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
