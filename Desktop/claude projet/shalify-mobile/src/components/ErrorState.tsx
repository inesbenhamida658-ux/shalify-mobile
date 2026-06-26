import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing } from '../theme';
import { AppText } from './AppText';
import { AppButton } from './AppButton';

interface Props {
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl },
  msg: { marginTop: Spacing.sm, marginBottom: Spacing.lg },
});

export function ErrorState({ message, onRetry, retryLabel = 'Réessayer' }: Props) {
  return (
    <View style={styles.container}>
      <AppText variant="h3" align="center">Une erreur est survenue</AppText>
      {message && <AppText variant="bodySmall" color="secondary" align="center" style={styles.msg}>{message}</AppText>}
      {onRetry && <AppButton label={retryLabel} onPress={onRetry} variant="outline" />}
    </View>
  );
}
