"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function CollapsibleCodeBlock({ language, code }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4">
      <button
        className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "숨기기 ▲" : "더보기 ▼"}
      </button>

      {isOpen && (
        <div className="mt-2">
          <SyntaxHighlighter language={language} style={oneDark} PreTag="div">
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
