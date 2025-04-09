interface TAttendance {
  quiz_id: string;
  due_at: string;
  name: string;
}

const fetchAttendance: () => Promise<TAttendance[] | Error> = async () => {
  try {
    let metaData = await fetch(
      process.env.BASE_URL +
        `/courses/${process.env.COURSE_ID}/assignments?search_term=Attendance&include[]=all_dates&bucket=upcoming&order_by=due_at`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          Accept: "application/json+canvas-string-ids",
          contentType: "application/json",
        },
      }
    );
    if (metaData.ok) {
      const data = await metaData.json();
      return data as TAttendance[];
    } else {
      return Error("Failed to fetch data.");
    }
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

export default fetchAttendance;
export type { TAttendance };
