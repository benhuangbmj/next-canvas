import UserInterface from "./components/UserInterface";
import fetchAttendance from "./lib/fetchAttendance";
import { TAttendance } from "./lib/fetchAttendance";
export default async function Home() {
  try {
    const dataAssignments = (await fetchAttendance()) as TAttendance[];
    return <UserInterface dataAssignments={dataAssignments} />;
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return <div>Error fetching attendance data</div>;
  }
}
