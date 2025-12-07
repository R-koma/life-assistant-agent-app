"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function ProtectedComponent() {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/protected`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [getToken]);
  return (
    <div>
      {error && <p>Error: {error}</p>}
      {data && (
        <div className="user-info">
          <h2>ユーザー情報</h2>
          <p>User ID: {data.user_id}</p>
          <p>Session ID: {data.session_id}</p>
          <p>{data.message}</p>
        </div>
      )}
    </div>
  );
}
