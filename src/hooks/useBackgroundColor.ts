import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const useBackgroundColor = () => {
  const count = useSelector((state: RootState) => state.counter.count);

  return useMemo(() => {
    const hue = Math.min(count * 40, 360);
    return `hsl(${hue}, 70%, 90%)`;
  }, [count]);
};

export default useBackgroundColor;
