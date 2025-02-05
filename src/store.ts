import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import editorReducer from "./features/editorSlice";
import userReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    userData: userReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
