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
    <div className="p-4 flex flex-col gap-4 justify-start w-fit m-2 text-white bg-linear-to-br from-black to-black/40">
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
