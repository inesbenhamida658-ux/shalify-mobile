import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';
import { LoadingState } from '../components';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['shalify://'],
  config: {
    screens: {
      Main: {
        screens: {
          CreateursTab: { screens: { CreatorDetail: 'creator/:creatorId' } },
        },
      },
    },
  },
};

export function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingState />;

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
