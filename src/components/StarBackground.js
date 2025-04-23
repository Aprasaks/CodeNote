export default function StarBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 원하는 만큼 별점 찍기 */}
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.2 + Math.random() * 0.3,
            filter: "blur(1.5px)",
          }}
        />
      ))}
    </div>
  );
}
