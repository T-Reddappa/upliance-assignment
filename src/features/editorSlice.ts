import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditorStore {
  content: string;
}

const initialState: EditorStore = {
  content: localStorage.getItem("editorContent") || "",
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    saveContent: (state, action: PayloadAction<string>) => {
      localStorage.setItem("editorContent", action.payload);
      state.content = action.payload;
    },
  },
});

export const { saveContent } = editorSlice.actions;
export default editorSlice.reducer;
