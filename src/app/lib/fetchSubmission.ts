"use server";
export default async function fetchSubmission(assignmentId: string) {
  try {
    const response = await fetch(
      process.env.BASE_URL +
        `/courses/${process.env.COURSE_ID}/assignments/${assignmentId}/submissions?per_page=50`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          Accept: "application/json+canvas-string-ids",
          contentType: "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      const scoredSubmissions = data.filter(
        (submission: { score: number }) => submission.score > 0
      );
      return { total: data.length - 1, scored: scoredSubmissions.length };
    } else {
      console.error("Failed to fetch submission.");
    }
  } catch (error) {
    console.error(error);
  }
}
