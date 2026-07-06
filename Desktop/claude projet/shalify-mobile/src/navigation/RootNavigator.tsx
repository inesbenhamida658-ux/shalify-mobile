import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';
import { LoadingState } from '../components';

type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const linking: any = {
  prefixes: ['shalify://'],
  config: {
    screens: {
      Main: {
        screens: {
          Tabs: {
            screens: {
              CreateursTab: { screens: { CreatorDetail: 'creator/:creatorId' } },
            },
          },
        },
      },
    },
  },
};

export function RootNavigator() {
  const { loading } = useAuth();

  if (loading) return <LoadingState />;

  // App ouverte : tout le monde entre et visite. La connexion s'ouvre en fenêtre,
  // seulement quand on veut agir (Profil, Messages, réservation).
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Auth" component={AuthStack} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
