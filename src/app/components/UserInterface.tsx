"use client";
import React from "react";
import SelectAssignment from "./SelectAssignment";
import Stopwatch from "./Stopwatch";
import { TAttendance } from "../lib/fetchAttendance";
import fetchQuestion from "../lib/fetchQuestion";
const UserInterface = ({
  dataAssignments,
}: {
  dataAssignments: TAttendance[];
}) => {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [code, setCode] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (selected) {
      fetchQuestion(selected).then((data) => {
        setCode(data[0].answers[0].text);
      });
    }
  }, [selected]);
  return (
    <div>
      <Stopwatch />
      <SelectAssignment
        dataAssignments={dataAssignments}
        setSelected={setSelected}
      />
      {code && <p>Code: {code}</p>}
    </div>
  );
};

export default UserInterface;
