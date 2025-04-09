import * as React from "react";
import ReactStopwatch from "react-stopwatch";

const Stopwatch = () => (
  <ReactStopwatch
    seconds={0}
    minutes={0}
    hours={0}
    onCallback={() => console.log("Finish")}
    render={({ formatted }) => {
      return (
        <div>
          <p>Time Elapsed: {formatted}</p>
        </div>
      );
    }}
  />
);

export default Stopwatch;
