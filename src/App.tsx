import React, { useMemo } from "react";
import "./App.css";
import Counter from "./components/Counter";
import UserForm from "./components/UserForm";
import TextEditor from "./components/RichTextEditor";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const count = useSelector((state: RootState) => state.counter.count);

  const backgroundColor = useMemo(() => {
    const hue = Math.min(count * 10, 360);
    return `hsl(${hue}, 70%, 80%)`;
  }, [count]);

  return (
    <div
      className="p-10"
      style={{
        backgroundColor,
        transition: "background-color 0.5s ease-out",
      }}
    >
      <div className=" grid grid-cols-2 gap-2">
        <Counter />
        <TextEditor />
      </div>
      <br />
      <UserForm />.{/* <hr /> */}
    </div>
  );
}

export default App;
