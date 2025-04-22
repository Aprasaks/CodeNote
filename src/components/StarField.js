// src/components/StarField.js
"use client";

import { useEffect, useState } from "react";

export default function StarField({ count = 80 }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // count 만큼 랜덤 위치·속성 갖는 별 배열 생성
    const arr = Array.from({ length: count }, () => ({
      top: Math.random() * 100, // 뷰포트 내 Y 위치 (퍼센트)
      left: Math.random() * 100, // 뷰포트 내 X 위치 (퍼센트)
      delay: Math.random() * 5, // 애니메이션 시작 지연 (0~5초)
      duration: 1 + Math.random() * 2, // 깜빡임 주기 (1~3초)
    }));
    setStars(arr);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 dark:block hidden">
      {stars.map((star, i) => (
        <span
          key={i}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
