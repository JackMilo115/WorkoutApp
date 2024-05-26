import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Activity {
  id: number;
  name: string;
  description: string;
  type: string;
}

interface ActivityState {
  activities: Activity[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ActivityState = {
  activities: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch activities
export const fetchActivities = createAsyncThunk('activities/fetchActivities', async () => {
  const response = await axios.get('/api/activities');
  return response.data;
});

// Activity slice
const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchActivities.fulfilled, (state, action: PayloadAction<Activity[]>) => {
        state.status = 'succeeded';
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch activities';
      });
  },
});

export default activitySlice.reducer;