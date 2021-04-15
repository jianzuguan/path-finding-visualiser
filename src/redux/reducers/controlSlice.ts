import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as controlsParams from 'utils/controlParams';

// Define a type for the slice state
interface controlsState {
  numRows: number;
  numCols: number;
  startNodeX: number;
  startNodeY: number;
  endNodeX: number;
  endNodeY: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
  instantShowResult: boolean;
}

// Define the initial state using that type
const initialState: controlsState = {
  numRows: controlsParams.NUM_ROWS,
  numCols: controlsParams.NUM_COLS,
  startNodeX: controlsParams.START_NODE_X,
  startNodeY: controlsParams.START_NODE_Y,
  endNodeX: controlsParams.END_NODE_X,
  endNodeY: controlsParams.END_NODE_Y,
  noiseOffsetX: controlsParams.NOISE_OFFSET_X,
  noiseOffsetY: controlsParams.NOISE_OFFSET_Y,
  instantShowResult: true,
};

export const controlsSlice = createSlice({
  name: 'controls',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setNumRows: (state, action: PayloadAction<number>) => {
      state.numRows = action.payload;
    },
    setNumCols: (state, action: PayloadAction<number>) => {
      state.numCols = action.payload;
    },
    setStartNodeX: (state, action: PayloadAction<number>) => {
      state.startNodeX = action.payload;
    },
    setStartNodeY: (state, action: PayloadAction<number>) => {
      state.startNodeY = action.payload;
    },
    setEndNodeX: (state, action: PayloadAction<number>) => {
      state.endNodeX = action.payload;
    },
    setEndNodeY: (state, action: PayloadAction<number>) => {
      state.endNodeY = action.payload;
    },
    setNoiseOffsetX: (state, action: PayloadAction<number>) => {
      state.noiseOffsetX = action.payload;
    },
    setNoiseOffsetY: (state, action: PayloadAction<number>) => {
      state.noiseOffsetY = action.payload;
    },
    setInstantShowResult: (state, action: PayloadAction<boolean>) => {
      state.instantShowResult = action.payload;
    },
  },
});

export default controlsSlice.reducer;
