import React from 'react';
import { ScrollView, View, StyleSheet, ViewStyle, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../theme';

interface Props {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  onRefresh?: () => Promise<void>;
  paddingHorizontal?: number;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.fond },
  scroll: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },
  view: { flex: 1, paddingHorizontal: Spacing.md },
});

export function ScreenContainer({ children, scrollable = true, style, onRefresh, paddingHorizontal }: Props) {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const ph = paddingHorizontal !== undefined ? { paddingHorizontal } : {};

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {scrollable ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.content, ph, style]}
          showsVerticalScrollIndicator={false}
          refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={Colors.vert} /> : undefined}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.view, ph, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
