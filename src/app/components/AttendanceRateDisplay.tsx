import React from "react";
import { TAttendance } from "../lib/fetchAttendance";
import fetchSubmission from "../lib/fetchSubmission";
import { Progress } from "@/components/ui/progress";

const AttendanceRateDisplay = ({
  quizId,
  dataAssignments,
}: {
  quizId: string | null;
  dataAssignments: TAttendance[] | null;
}) => {
  const [assignmentId, setAssignmentId] = React.useState<string | null>(null);
  const [total, setTotal] = React.useState<number | null>(null);
  const [scored, setScored] = React.useState<number | null>(null);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  React.useEffect(() => {
    setTotal(null);
    setScored(null);
    if (quizId && dataAssignments) {
      const selectedAssignment = dataAssignments.find(
        (assignment) => assignment.quiz_id === quizId
      );
      if (selectedAssignment) {
        setAssignmentId(selectedAssignment.id);
      }
    }
  }, [quizId, dataAssignments]);
  React.useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (assignmentId) {
      intervalRef.current = setInterval(() => {
        fetchSubmission(assignmentId).then((data) => {
          if (data) {
            setTotal(data.total);
            setScored(data.scored);
          }
        });
      }, 3000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [assignmentId]);

  return (
    total &&
    scored !== null && (
      <div>
        Attendance Rate:
        <div className="w-32 inline-block mx-4">
          <Progress value={(scored / total) * 100} />
        </div>
        {scored}/{total}
      </div>
    )
  );
};

export default AttendanceRateDisplay;
