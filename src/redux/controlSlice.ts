import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as controlsParams from "utils/controlParams";


// Define a type for the slice state
interface controlsState {
  startNodeY: number;
  startNodeX: number;
}

// Define the initial state using that type
const initialState: controlsState = {
  startNodeX: controlsParams.START_NODE_X,
  startNodeY: controlsParams.START_NODE_Y,
};

export const controlsSlice = createSlice({
  name: "controls",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setStartNodeX: (state, action: PayloadAction<number>) => {
      state.startNodeX = action.payload;
    },
    setStartNodeY: (state, action: PayloadAction<number>) => {
      state.startNodeY = action.payload;
    },
  },
});


export default controlsSlice.reducer;
