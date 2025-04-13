//to remove: questionId
import { TAttendance } from "../lib/fetchAttendance";
import fetchCode from "../lib/fetchCode";
import updateCode from "../lib/updateCode";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const assignedTime = 15;

const CodeDisplay = ({
  quizId,
  dataAssignments,
}: {
  quizId: string | null;
  dataAssignments: TAttendance[] | null;
}) => {
  const [code, setCode] = React.useState<any>("");
  const [timePassed, setTimePassed] = React.useState<number>(0);
  const [display, setDisplay] = React.useState<boolean>(false);
  const [renew, setRenew] = React.useState<boolean>(false);
  const timePassedIntervalRef = React.useRef<ReturnType<
    typeof setInterval
  > | null>(null);
  const quizIdRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (quizIdRef.current !== quizId) {
      setRenew(true);
      quizIdRef.current = quizId;
    }
  }, [dataAssignments, quizId]);
  React.useEffect(() => {
    setDisplay(false);
    if (!renew) setTimePassed(0);
    if (timePassedIntervalRef.current !== null) {
      clearInterval(timePassedIntervalRef.current);
    }
    if (dataAssignments && quizId && !renew) {
      fetchCode(quizId).then((res) => {
        setCode(res.code);
        setDisplay(true);
      });
      let count = 1;
      timePassedIntervalRef.current = setInterval(() => {
        setTimePassed((prev) => {
          if (prev < assignedTime) {
            return (prev + 1) % (assignedTime + 1);
          } else {
            return prev;
          }
        });
        count++;
        if (count > assignedTime + 1) {
          clearInterval(timePassedIntervalRef.current!);
          setRenew(true);
          setDisplay(false);
          count = 1;
        }
      }, 1000);
    }
    return () => {
      if (timePassedIntervalRef.current) {
        clearInterval(timePassedIntervalRef.current);
      }
    };
  }, [renew]);
  React.useEffect(() => {
    if (renew && quizId) {
      updateCode({ quizId: quizId })
        .then((res) => {
          if (res) {
            setTimeout(() => {
              setTimePassed(0);
              setRenew(false);
            }, 1000);
          }
        })
        .catch((error) => {
          console.error("Error updating code:", error);
        });
    }
  }, [renew]);
  return (
    <div className="flex flex-row items-center justify-start gap-4">
      <div className="flex flex-row items-center justify-start gap-4">
        <span>Code: </span>
        <span
          className={`text-5xl transition transition-opacity ease-in-out duration-1000 ${
            display ? "opacity-100" : "opacity-0"
          }`}
        >
          {code}
        </span>
      </div>
      <div
        className={`w-[70px] transition ease-in-out duration-1000 ${
          display ? "opacity-100" : "opacity-0"
        }`}
      >
        <CircularProgressbar
          value={timePassed}
          maxValue={assignedTime}
          text={`${assignedTime - timePassed}s`}
          strokeWidth={50}
          styles={buildStyles({
            strokeLinecap: "butt",
            textColor: "white",
            textSize: "3em",
          })}
        />
      </div>
    </div>
  );
};

export default CodeDisplay;
