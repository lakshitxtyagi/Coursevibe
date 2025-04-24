import { useEffect, useState } from "react";

const CourseSummary = ({ courseId }) => {
  const [summary, setSummary] = useState("Loading summary...");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("http://localhost:8000/summarize_reviews/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviews: [
              "Great course with engaging content.",
              "Very informative but could have better structure.",
              "Loved the hands-on projects and real-world applications."
            ],
          }),
        });

        const data = await response.json();
        setSummary(data.summary);
      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary("Failed to load summary.");
      }
    };

    fetchSummary();
  }, [courseId]);

  return <p>{summary}</p>;
};

export default CourseSummary;
