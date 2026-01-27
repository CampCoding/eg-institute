import { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "@/libs/constant";

export default function useFetchCourseDetails(courseId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("eg_user_token");

        const response = await axios.post(
          `${base_url}/courses/select_course_details.php`,
          { course_id: courseId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  return { data, isLoading, error };
}
