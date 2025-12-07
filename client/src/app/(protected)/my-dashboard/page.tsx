"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function MyDashboardPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!isLoaded || !isSignedIn) return;

      try {
        const token = await getToken();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        // 認証必須のAPIリクエスト（Authorizationヘッダー付き）
        const response = await fetch(`${apiUrl}/api/private/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDashboard(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [getToken, isLoaded, isSignedIn]);

  if (!isLoaded) {
    return <div className="p-8">Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="p-8">
        <p className="text-red-600">
          このページを閲覧するにはサインインが必要です
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">マイダッシュボード</h1>
      <p className="mb-4 text-gray-600">
        このページは認証されたユーザーのみ閲覧できます
      </p>

      {dashboard && (
        <div className="space-y-6">
          {/* ユーザー情報 */}
          <div className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">ユーザー情報</h2>
            <p>
              <strong>User ID:</strong> {dashboard.user_id}
            </p>
            <p>
              <strong>Session ID:</strong> {dashboard.session_id}
            </p>
          </div>

          {/* 統計情報 */}
          <div className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">統計</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold">
                  {dashboard.stats.articles_read}
                </p>
                <p className="text-sm text-gray-500">読んだ記事</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {dashboard.stats.time_spent}
                </p>
                <p className="text-sm text-gray-500">利用時間</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">最終ログイン</p>
                <p className="text-xs">
                  {new Date(dashboard.stats.last_login).toLocaleString("ja-JP")}
                </p>
              </div>
            </div>
          </div>

          {/* おすすめ */}
          <div className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">おすすめ記事</h2>
            <ul className="list-disc list-inside space-y-1">
              {dashboard.recommendations.map((rec: string, idx: number) => (
                <li key={idx} className="text-gray-700">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
