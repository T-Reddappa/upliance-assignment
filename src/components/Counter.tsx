import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

import Button from "@mui/material/Button";
import { decrement, increment, reset } from "../features/counterSlice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const backgroundColor = useMemo(() => {
    const hue = Math.min(count * 10, 360);
    const startColor = `hsl(${hue}, 100%, 70%)`;
    const endColor = `hsl(${(hue + 120) % 360}, 100%, 70%)`; // Adding 120 for a contrasting color

    return `linear-gradient(to right, ${startColor}, ${endColor})`;
  }, [count]);

  return (
    <div
      className=" p-4 rounded-md shadow-xl"
      style={{
        background: "var(--primary-color)",
        transition: "background-color 0.5s ease-out",
      }}
    >
      <h2
        className="text-3xl font-semibold"
        style={{ color: "var(--primary-text-color)" }}
      >
        Counter
      </h2>
      <div className="flex flex-col gap-5 items-center justify-evenly h-[90%] ">
        <p className="font-bold text-xl ">{count}</p>
        <div className="flex gap-3">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => dispatch(increment())}
          >
            +
          </Button>
          <Button color="secondary" onClick={() => dispatch(reset())}>
            Reset
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => dispatch(decrement())}
          >
            -
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
