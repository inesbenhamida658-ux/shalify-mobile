import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/main/HomeScreen';
import { SearchScreen } from '../screens/main/SearchScreen';
import { CreatorsScreen } from '../screens/main/CreatorsScreen';
import { CreatorDetailScreen } from '../screens/main/CreatorDetailScreen';
import { MessagesScreen } from '../screens/main/MessagesScreen';
import { FavoritesScreen } from '../screens/main/FavoritesScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { SettingsScreen } from '../screens/main/SettingsScreen';
import { Colors } from '../theme';
import { AppText } from '../components';

export type MainTabParamList = {
  Accueil: undefined;
  Recherche: undefined;
  CreateursTab: undefined;
  Favoris: undefined;
  Messages: undefined;
  Profil: undefined;
};

export type CreateursStackParamList = {
  CreateursList: undefined;
  CreatorDetail: { creatorId: string };
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const CreateursStack = createNativeStackNavigator<CreateursStackParamList>();

function CreateursNavigator() {
  return (
    <CreateursStack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.fond }, headerTintColor: Colors.vert, headerShadowVisible: false }}>
      <CreateursStack.Screen name="CreateursList" component={CreatorsScreen} options={{ headerShown: false }} />
      <CreateursStack.Screen name="CreatorDetail" component={CreatorDetailScreen} options={{ title: 'Créateur' }} />
    </CreateursStack.Navigator>
  );
}

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return <AppText variant="caption" color={focused ? 'primary' : 'muted'}>{label}</AppText>;
}

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.fond },
        headerTintColor: Colors.vert,
        headerShadowVisible: false,
        tabBarStyle: { backgroundColor: Colors.blanc, borderTopColor: Colors.bordure },
        tabBarActiveTintColor: Colors.vert,
        tabBarInactiveTintColor: Colors.gris,
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Recherche" component={SearchScreen} />
      <Tab.Screen name="CreateursTab" component={CreateursNavigator} options={{ title: 'Créateurs' }} />
      <Tab.Screen name="Favoris" component={FavoritesScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
