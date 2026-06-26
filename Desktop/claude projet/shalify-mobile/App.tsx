import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import { LangProvider } from './src/context/LangContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <StatusBar style="dark" backgroundColor="transparent" translucent />
        <RootNavigator />
      </AuthProvider>
    </LangProvider>
  );
}
