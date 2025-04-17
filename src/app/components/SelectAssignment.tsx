"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TAttendance } from "../lib/fetchAttendance";
const SelectAssignment = ({
  dataAssignments,
  setSelected,
}: {
  dataAssignments: TAttendance[];
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  if (!dataAssignments.length)
    return <div className="text-red-500">Unable to find assignments.</div>;
  return (
    <Select onValueChange={(value) => setSelected(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Select Assignment" />
      </SelectTrigger>
      <SelectContent>
        {dataAssignments.map((assignment) => (
          <SelectItem key={assignment.quiz_id} value={assignment.quiz_id}>
            {assignment.name +
              ` -  ${new Date(assignment.due_at).toLocaleDateString()}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
export default SelectAssignment;
