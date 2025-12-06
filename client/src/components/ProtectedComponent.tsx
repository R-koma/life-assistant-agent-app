"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function ProtectedComponent() {
  const { getToken } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const response = await fetch("http://localhost:8000/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, [getToken]);
}
