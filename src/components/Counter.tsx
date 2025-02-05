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
    return `hsl(60%, ${hue}, 80%)`;
  }, [count]);

  return (
    <div
      className=" p-4 rounded-md shadow-xl"
      style={{ backgroundColor, transition: "background-color 0.5s ease-out" }}
    >
      <h2 className="text-3xl">Counter</h2>
      <div className=" flex flex-col gap-3 items-center justify-center">
        <p className="font-bold text-xl ">{count}</p>
        <div
          className="flex gap-3
      "
        >
          <Button variant="outlined" onClick={() => dispatch(increment())}>
            +
          </Button>
          <Button onClick={() => dispatch(reset())}>Reset</Button>
          <Button variant="outlined" onClick={() => dispatch(decrement())}>
            -
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
