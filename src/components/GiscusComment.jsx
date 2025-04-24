// src/components/GiscusComment.jsx
"use client";

import Giscus from "@giscus/react";

export default function GiscusComment() {
  return (
    <div className="pt-8 border-t border-zinc-700">
      <Giscus
        repo="Aprasaks/code-note-comments"
        repoId="R_kgDOOfDkTw"
        category="General"
        categoryId="DIC_kwDOOfDkT84Cpa3b"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
