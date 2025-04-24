"use client"; // 꼭 있어야 함

import { useEffect, useState } from "react";

export default function StarBackground({ count = 100 }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: 0.2 + Math.random() * 0.3,
    }));
    setStars(generated);
  }, [count]);

  if (stars.length === 0) return null; // hydration mismatch 방지

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            opacity: s.opacity,
            filter: "blur(1.5px)",
          }}
        />
      ))}
    </div>
  );
}
