'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, usePathname } from 'next/navigation';

// 클라이언트 전용으로 ForceGraph2D 컴포넌트 로드
const ForceGraph2D = dynamic(
  () => import('react-force-graph-2d'),
  { ssr: false }
);

// 카테고리 클러스터 정의
const CLUSTERS = [
  { id: 'HTML', color: '#e44d26' },
  { id: 'CSS', color: '#264de4' },
  { id: 'JavaScript', color: '#f0db4f' },
  { id: 'React', color: '#61dafb' },
  { id: 'Node.js', color: '#68a063' },
];

// 카테고리별 상세 노드 매핑
const DETAILS = {
  HTML:       [{ id: 'array', title: '배열', slug: '/posts/javascript/array' }],
  CSS:        [{ id: 'flexbox', title: 'Flexbox', slug: '/posts/css/flexbox' }],
  JavaScript: [{ id: 'map-filter', title: 'map·filter 사용법', slug: '/posts/javascript/map-filter' }],
  React:      [{ id: 'usestate', title: 'useState 이해하기', slug: '/posts/react/usestate' }],
  'Node.js':  [{ id: 'api-routing', title: 'API 라우팅', slug: '/posts/nodejs/api-routing' }],
};

// 초깃값 그래프 데이터
const initialGraph = {
  nodes: CLUSTERS.map((c) => ({ ...c, __isCluster: true })),
  links: [],
};

export default function ForceGraphClusters() {
  const [graphData, setGraphData] = useState(initialGraph);
  const router = useRouter();
  const path = usePathname();
  const fgRef = useRef();
  const iconMapRef = useRef({});

  // 아이콘 로드 (클라이언트 사이드)
  useEffect(() => {
    const map = {};
    CLUSTERS.forEach(({ id }) => {
      const img = new Image();
      const name = id === 'Node.js' ? 'node' : id.toLowerCase();
      img.src = `/images/${name}.svg`;
      map[id] = img;
    });
    iconMapRef.current = map;
  }, []);

  // 경로 변경 시 그래프 초기화 및 화면에 맞게 fit
  useEffect(() => {
    setGraphData(initialGraph);
    fgRef.current?.zoomToFit(500, 20);
  }, [path]);

  // 노드 클릭 핸들러
  const handleNodeClick = (node) => {
    if (node.__isCluster) {
      // 클러스터 클릭 시 상세 노드 보여주기
      const detailList = DETAILS[node.id] || [];
      const detailNodes = detailList.map((d) => ({ ...d, cluster: node.id, color: '#aaa' }));
      const detailLinks = detailList.map((d) => ({ source: node.id, target: d.id }));

      setGraphData({
        nodes: [...CLUSTERS.map((c) => ({ ...c, __isCluster: true })), ...detailNodes],
        links: detailLinks,
      });
      fgRef.current?.centerAt(node.x, node.y, 1000);
      fgRef.current?.zoom(2, 1000);
    } else {
      // 상세 노드 클릭 시 포스트로 이동
      node.slug && router.push(node.slug);
    }
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        // 클릭 영역 지정
        nodePointerAreaPaint={(node, color, ctx) => {
          const r = node.__isCluster ? 20 : 8;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
          ctx.fill();
        }}
        // 노드 및 레이블 그리기
        nodeCanvasObject={(node, ctx, globalScale) => {
          const size = node.__isCluster ? 40 : 8;
          const img = iconMapRef.current[node.id];
          if (node.__isCluster && img?.complete && img.naturalWidth) {
            ctx.drawImage(img, node.x - size / 2, node.y - size / 2, size, size);
          } else {
            ctx.beginPath();
            ctx.arc(node.x, node.y, size / 2, 0, 2 * Math.PI);
            ctx.fillStyle = node.color;
            ctx.fill();
          }
          // 레이블
          const label = node.title || node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = '#fff';
          ctx.fillText(label, node.x + size / 2 + 4, node.y + fontSize / 2);
        }}
        onNodeClick={handleNodeClick}
        onEngineStop={() => fgRef.current?.zoomToFit(500, 20)}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={1}
        linkColor={() => '#999'}
        linkWidth={1}
        d3VelocityDecay={0.3}
      />
    </div>
  );
}
