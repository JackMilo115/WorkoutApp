import React, { useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../src/store/hooks';
import { fetchWorkouts } from '../src/store/workoutSlice';

const WorkoutScreen = () => {
  const dispatch = useAppDispatch();
  const workouts = useAppSelector(state => state.workouts.workouts);
  const status = useAppSelector(state => state.workouts.status);
  const error = useAppSelector(state => state.workouts.error);

  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch]);

  return (
    <View>
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'failed' && <Text>Error: {error}</Text>}
      {status === 'succeeded' && (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>Activity: {item.activity.name}</Text>
              <Text>Duration: {item.duration} mins</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default WorkoutScreen;