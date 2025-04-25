import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GraphClient from "./GraphClient-CLEAN";

export default async function ReactGraphPage() {
  const postsDir = path.join(process.cwd(), "src/app/posts/react");
  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));

  const nodes = [];
  const links = [];

  files.forEach((file) => {
    const filePath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const title = data.title || file.replace(/\.md$/, "");
    nodes.push({ id: title, group: "react" });

    const matches = [...content.matchAll(/\[\[([^\]]+)\]\]/g)];
    matches.forEach((match) => {
      links.push({ source: title, target: match[1] });
    });
  });

  // ✅ 여기서 결과 확인!
  console.log("📦 MD 파일 수:", files.length);
  console.log("🌟 생성된 노드:", nodes);
  console.log("🔗 생성된 링크:", links);

  return <GraphClient nodes={nodes} links={links} />;
}
