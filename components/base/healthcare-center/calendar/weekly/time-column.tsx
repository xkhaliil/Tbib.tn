import React from "react";

export function TimeColumn() {
  const times = Array.from({ length: 24 }, (_, i) => i); // Array of hours in a day

  return (
    <div className="time-column">
      {times.map((time) => (
        <div key={time} className="time-slot">
          {time}:00
        </div>
      ))}
    </div>
  );
}
