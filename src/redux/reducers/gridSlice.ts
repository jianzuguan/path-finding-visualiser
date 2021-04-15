import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TypeNode from 'types/Node';

// Define a type for the slice state
interface gridState {
  grid: TypeNode[][];
}

// Define the initial state using that type
const initialState: gridState = {
  grid: [],
};

export const gridSlice = createSlice({
  name: 'grid',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setGrid: (state, action: PayloadAction<TypeNode[][]>) => {
      state.grid = action.payload;
    },
  },
});

export default gridSlice.reducer;
