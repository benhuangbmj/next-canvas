"use client";
import React from "react";
import SelectAssignment from "./SelectAssignment";
import Stopwatch from "./Stopwatch";
import { TAttendance } from "../lib/fetchAttendance";
import fetchQuestion from "../lib/fetchQuestion";
import fetchSubmission from "../lib/fetchSubmission";
import { Progress } from "@/components/ui/progress";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UserInterface = ({
  dataAssignments,
}: {
  dataAssignments: TAttendance[];
}) => {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [assignmentId, setAssignmentId] = React.useState<string | null>(null);
  const [code, setCode] = React.useState<string | null>(null);
  const [total, setTotal] = React.useState<number | null>(null);
  const [scored, setScored] = React.useState<number | null>(null);
  const [timePassed, setTimePassed] = React.useState<number>(0);
  React.useEffect(() => {
    if (selected) {
      fetchQuestion(selected).then((data) => {
        setCode(data[0].answers[0].text);
      });
      const selectedAssignment = dataAssignments.find(
        (assignment) => assignment.quiz_id === selected
      );
      if (selectedAssignment) {
        setAssignmentId(selectedAssignment.id);
      }
      setInterval(() => {
        setTimePassed((prev) => (prev + 1) % 11);
      }, 1000);
    }
  }, [selected]);
  React.useEffect(() => {
    if (assignmentId) {
      setInterval(() => {
        fetchSubmission(assignmentId).then((data) => {
          if (data) {
            setTotal(data.total);
            setScored(data.scored);
          }
        });
      }, 3000);
    }
  }, [assignmentId]);
  return (
    <div className="p-4">
      <Stopwatch />
      <SelectAssignment
        dataAssignments={dataAssignments}
        setSelected={setSelected}
      />
      {code && (
        <div className="flex flex-row items-center justify-center w-fit my-4">
          <div>
            Code: <span className="text-3xl">{code}</span>
          </div>
          <div className=" mx-4 w-[50px]">
            <CircularProgressbar
              value={timePassed}
              maxValue={10}
              text={`${10 - timePassed}s`}
              strokeWidth={50}
              styles={buildStyles({
                strokeLinecap: "butt",
                textColor: "white",
                textSize: "2.5em",
              })}
            />
          </div>
        </div>
      )}
      {total && scored && (
        <div>
          Attendance Rate:
          <div className="w-32 inline-block mx-4">
            <Progress value={(scored / total) * 100} />
          </div>
          {scored}/{total}
        </div>
      )}
    </div>
  );
};

export default UserInterface;
