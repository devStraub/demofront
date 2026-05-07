import { useEffect, useState } from "react";

export function useList() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([{ id: 1, name: "Item 1" }]);
      setLoading(false);
    }, 500);
  }, []);

  return {
    data,
    loading,
  };
}