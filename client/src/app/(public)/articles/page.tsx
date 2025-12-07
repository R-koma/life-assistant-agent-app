"use client";

import { useEffect, useState } from "react";

export default function PublicArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        // 認証不要のAPIリクエスト（Authorizationヘッダーなし）
        const response = await fetch(`${apiUrl}/api/public/articles`);

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div className="p-8">Loading articles...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">公開記事一覧</h1>
      <p className="mb-4 text-gray-600">
        このページは誰でも閲覧できます（認証不要）
      </p>

      <div className="grid gap-4">
        {articles.map((article) => (
          <div key={article.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-500">ID: {article.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
