import React, { useMemo } from "react";
import Counter from "../components/Counter";
import TextEditor from "../components/RichTextEditor";
import UserForm from "../components/UserForm";
import useBackgroundColor from "../hooks/useBackgroundColor";

const Home = () => {
  const backgroundColor = useBackgroundColor();

  return (
    <div style={{ backgroundColor }} className="p-10 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 ">
        <Counter />
        <TextEditor />
      </div>
      <div>
        <UserForm />
      </div>
    </div>
  );
};

export default Home;
