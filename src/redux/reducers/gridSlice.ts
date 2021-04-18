import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TypeNode from 'types/Node';

// Define a type for the slice state
interface gridState {
  grid: TypeNode[][];
  isSearching: boolean;
  isTracing: boolean;
}

// Define the initial state using that type
const initialState: gridState = {
  grid: [],
  isSearching: false,
  isTracing: false,
};

export const gridSlice = createSlice({
  name: 'grid',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setGrid: (state, action: PayloadAction<TypeNode[][]>) => {
      state.grid = action.payload;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    setIsTracing: (state, action: PayloadAction<boolean>) => {
      state.isTracing = action.payload;
    },
  },
});

export default gridSlice.reducer;
