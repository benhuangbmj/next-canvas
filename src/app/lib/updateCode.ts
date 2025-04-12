"use server";
const updateCode = async ({ quizId }: { quizId: string }) => {
  const newCode = Array.from(Array(4), () =>
    Math.floor(Math.random() * 10)
  ).join("");
  try {
    const quizUpdated = await fetch(
      `${process.env.BASE_URL}/courses/${process.env.COURSE_ID}/quizzes/${quizId}?quiz[notify_of_update]=false&quiz[access_code]=${newCode}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          Accept: "application/json+canvas-string-ids",
          contentType: "application/json",
        },
      }
    );
    if (quizUpdated.ok) {
      return true;
    }
    throw new Error("Failed to update quiz.");
  } catch (error) {
    console.error("Error updating code:", error);
    throw error;
  }
};

export default updateCode;
