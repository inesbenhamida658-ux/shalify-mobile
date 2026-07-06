import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { AuthProvider } from './src/context/AuthContext';
import { LangProvider } from './src/context/LangContext';
import { TextScaleProvider } from './src/context/TextScaleContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { BiometricGate } from './src/components/BiometricGate';
import { FontMap } from './src/fonts';
import { Colors } from './src/theme';

export default function App() {
  const [fontsLoaded, fontError] = useFonts(FontMap);

  // Tant que les polices ne sont pas prêtes, fond crème (le splash reste visible).
  // En cas d'erreur de police, on affiche quand même l'app (fallback système) pour ne jamais bloquer.
  if (!fontsLoaded && !fontError) {
    return <View style={{ flex: 1, backgroundColor: Colors.creme }} />;
  }

  return (
    <LangProvider>
      <TextScaleProvider>
        <AuthProvider>
          <StatusBar style="dark" />
          <BiometricGate>
            <RootNavigator />
          </BiometricGate>
        </AuthProvider>
      </TextScaleProvider>
    </LangProvider>
  );
}
