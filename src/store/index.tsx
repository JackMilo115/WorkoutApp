import { configureStore } from '@reduxjs/toolkit';
import activityReducer from './activitySlice';
import workoutReducer from './workoutSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    activities: activityReducer,
    workouts: workoutReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;