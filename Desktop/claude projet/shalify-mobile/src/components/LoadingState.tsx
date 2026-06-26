import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../theme';
import { AppText } from './AppText';

interface Props { message?: string }

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl },
  text: { marginTop: Spacing.md },
});

export function LoadingState({ message }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.vert} />
      {message && <AppText variant="bodySmall" color="secondary" style={styles.text} align="center">{message}</AppText>}
    </View>
  );
}
