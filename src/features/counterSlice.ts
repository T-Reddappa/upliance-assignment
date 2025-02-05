import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    countHistory: [] as number[],
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
      state.countHistory.push(state.count);
    },
    decrement: (state) => {
      if (state.count > 0) {
        state.count -= 1;
        state.countHistory.push(state.count);
      }
    },
    reset: (state) => {
      state.count = 0;
      state.countHistory.push(state.count);
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
