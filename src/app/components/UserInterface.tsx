"use client";
import React from "react";
import { TAttendance } from "../lib/fetchAttendance";
import SelectAssignment from "./SelectAssignment";
import Stopwatch from "./Stopwatch";
import CodeDisplay from "./CodeDisplay";
import AttendanceRateDisplay from "./AttendanceRateDisplay";

const UserInterface = ({
  dataAssignments,
}: {
  dataAssignments: TAttendance[];
}) => {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <div className="p-4">
      <Stopwatch />
      <SelectAssignment
        dataAssignments={dataAssignments}
        setSelected={setSelected}
      />
      <CodeDisplay quizId={selected} dataAssignments={dataAssignments} />
      <AttendanceRateDisplay
        quizId={selected}
        dataAssignments={dataAssignments}
      />
    </div>
  );
};

export default UserInterface;
