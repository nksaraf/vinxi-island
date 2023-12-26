import { useEffect, useState } from "react";

export function Timer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let i = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <span className="tabular-nums">
      {Math.floor(count / 60)}:
      {Math.floor(count % 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}
    </span>
  );
}
