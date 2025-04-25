import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function reactPostsPage() {
  const postsDir = path.join(process.cwd(), "src/app/posts/react");
  const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));

  const posts = files.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug: filename.replace(/\.md$/, ""),
      title: data.title,
      description: data.description || "",
      date:
        typeof data.date === "string" ? data.date : new Date(data.date).toISOString().split("T")[0],
    };
  });

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">react Posts</h1>
      <p className="text-gray-400">react 관련 포스트 모음</p>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/react/${post.slug}`}
            className="block p-4 bg-zinc-800 rounded-lg shadow hover:bg-zinc-700 transition"
          >
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-400 text-sm mt-1">{post.description}</p>
            <p className="text-gray-500 text-xs mt-1">{post.date}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
