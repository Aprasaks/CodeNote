'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, usePathname } from 'next/navigation';

// 클라이언트 전용으로 ForceGraph2D 로드
const ForceGraph2D = dynamic(
  () => import('react-force-graph-2d'),
  { ssr: false }
);

// 1) 클러스터 정의
const CLUSTERS = [
  { id: 'HTML'      },
  { id: 'CSS'       },
  { id: 'JavaScript'},
  { id: 'React'     },
  { id: 'Node'   },
];

// 2) 상세 노드 매핑
const DETAILS = {
  HTML:       [{ id: 'array',       title: '배열',               slug: '/posts/javascript/array' }],
  CSS:        [{ id: 'flexbox',     title: 'Flexbox',           slug: '/posts/css/flexbox'         }],
  JavaScript: [{ id: 'map-filter',  title: 'map·filter 사용법', slug: '/posts/javascript/map-filter'}],
  React:      [{ id: 'usestate',    title: 'useState 이해하기',  slug: '/posts/react/usestate'     }],
  Node:  [{ id: 'api-routing', title: 'API 라우팅',        slug: '/posts/node/api-routing'}],
};

// 3) 파스텔톤 cluster 색상
const CLUSTER_COLORS = {
  HTML:       'rgba(228,  77,  38, 0.3)',   // 연한 주황
  CSS:        'rgba( 38,  77, 228, 0.3)',   // 연한 파랑
  JavaScript: 'rgba(240, 219,  79, 0.3)',   // 연한 노랑
  React:      'rgba( 97, 218, 251, 0.3)',   // 연한 청록
  Node:  'rgba(104, 160,  99, 0.3)',   // 연한 초록
};

// 4) 모든 detail nodes & links 생성
const detailNodes = Object.entries(DETAILS).flatMap(([cluster, items]) =>
  items.map((d) => ({
    ...d,
    __isCluster: false,
    color: 'rgba(255,255,255,0.8)',  // 연한 흰색
    cluster
  }))
);
const detailLinks = Object.entries(DETAILS).flatMap(([cluster, items]) =>
  items.map((d) => ({ source: cluster, target: d.id }))
);

// 5) 초기 그래프에 클러스터 + 모든 포스팅(detail) 포함
const initialGraph = {
  nodes: [
    // 클러스터 노드
    ...CLUSTERS.map((c) => ({
      id: c.id,
      __isCluster: true,
      color: CLUSTER_COLORS[c.id]
    })),
    // detail 노드
    ...detailNodes
  ],
  links: detailLinks
};

export default function ForceGraphClusters() {
  const [graphData, setGraphData] = useState(initialGraph);
  const router = useRouter();
  const path = usePathname();
  const fgRef = useRef();

  // mount 시 & path 변경 시 항상 fit
  useEffect(() => {
    fgRef.current?.zoomToFit(500, 20);
  }, [path]);

  // 노드 클릭: slug가 있으면 해당 포스트로 이동
  const handleNodeClick = (node) => {
    node.slug && router.push(node.slug);
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}

        // 클릭 영역: 클러스터/디테일에 맞춰 반경 조정
        nodePointerAreaPaint={(node, color, ctx) => {
          const r = node.__isCluster ? 20 : 8;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
          ctx.fill();
        }}

        // 노드 & 레이블 그리기: 아이콘 대신 모두 원(circle)
        nodeCanvasObject={(node, ctx, globalScale) => {
          const isCluster = node.__isCluster;
          const r = node.__isCluster ? 20 : 8;
          // 원 그리기
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
          ctx.fillStyle = node.color;
          ctx.fill();

          const label     = node.title || node.id;
          const fontSize  = 24 / globalScale;
          ctx.font        = `${fontSize}px Sans-Serif`;
          ctx.fillStyle   = '#fff';

          if (isCluster) {
            // — 클러스터: 원 안에 중앙 정렬
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
          
            ctx.fillText(label, node.x, node.y);
            return;
          }

          const LABEL_THRESHOLD = 2.5;
          if (globalScale > LABEL_THRESHOLD) {
            ctx.textAlign    = 'start';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText(label, node.x + r + 4, node.y + fontSize / 2);
          }
          

         
           

         
        }}

        onNodeClick={handleNodeClick}
        onEngineStop={() => fgRef.current?.zoomToFit(500, 20)}

        // 링크 스타일 (필요시 조절)
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={1}
        linkColor={() => '#aaa'}
        linkWidth={1}

        d3VelocityDecay={0.3}
      />
    </div>
  );
}
