import { configureStore } from '@reduxjs/toolkit'
import controlsReducer from 'redux/reducers/controlSlice';
import gridSlice from 'redux/reducers/gridSlice';

const store = configureStore({
  reducer: {
    controls: controlsReducer,
    grid: gridSlice,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;