"use server";
const fetchCode: (quizzId: string) => Promise<{ code: string }> = async (
  quizzId: string
) => {
  try {
    const response = await fetch(
      process.env.BASE_URL +
        `/courses/${process.env.COURSE_ID}/quizzes/${quizzId}`,
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
      const output = {
        code: data.access_code,
      };
      return output;
    } else {
      console.error("Failed to fetch questions.");
      throw new Error("Failed to fetch questions.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchCode;
