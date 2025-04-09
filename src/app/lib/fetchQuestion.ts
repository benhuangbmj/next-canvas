"use server";
const fetchQuestion = async (selected: string) => {
  try {
    const response = await fetch(
      process.env.BASE_URL +
        `/courses/${process.env.COURSE_ID}/quizzes/${selected}/questions`,
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
      return data;
    } else {
      console.error("Failed to fetch questions.");
    }
  } catch (error) {
    console.error(error);
  }
};

export default fetchQuestion;
