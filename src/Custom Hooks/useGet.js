import { useEffect, useState } from "react";
import { config } from "../Constant/environment";

export const useGet = (endPoint) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/${endPoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors", // Adding no-cors mode
        });

        // Since no-cors mode limits response usage, we assume success
        if (response.type === "opaque") {
          console.warn("Limited access to response due to 'no-cors' mode");
          setData({ message: "Data fetched successfully (limited details)" });
        } else {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          setData(result);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [endPoint]);

  return [data, loading];
};
