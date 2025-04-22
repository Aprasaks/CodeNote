/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 개발 서버와 빌드 시 ESLint 검사를 건너뜁니다
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript 에러도 빌드 시 무시하려면 추가하세요 (선택)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
