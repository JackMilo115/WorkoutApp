import React, { useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../src/store/hooks';
import { fetchActivities } from '../src/store/activitySlice';

const ActivityScreen = () => {
  const dispatch = useAppDispatch();
  const activities = useAppSelector(state => state.activities.activities);
  const status = useAppSelector(state => state.activities.status);
  const error = useAppSelector(state => state.activities.error);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  return (
    <View>
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'failed' && <Text>Error: {error}</Text>}
      {status === 'succeeded' && (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ActivityScreen;