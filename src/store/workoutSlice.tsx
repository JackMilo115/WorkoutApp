import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Activity {
  id: number;
  name: string;
  description: string;
  type: string;
}

interface Workout {
  id: number;
  activityID: number;
  activity: Activity;
  duration: number;
}

interface WorkoutState {
  workouts: Workout[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: WorkoutState = {
  workouts: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch workouts
export const fetchWorkouts = createAsyncThunk('workouts/fetchWorkouts', async () => {
  const response = await axios.get('/api/workouts');
  return response.data;
});

// Workout slice
const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorkouts.fulfilled, (state, action: PayloadAction<Workout[]>) => {
        state.status = 'succeeded';
        state.workouts = action.payload;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch workouts';
      });
  },
});

export default workoutSlice.reducer;