import React from 'react';
import { ScrollView, Image, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing } from '../theme';

interface Props {
  photos?: string[];
}

// Galerie horizontale des photos d'une fiche créateur.
// Repli élégant : rien ne s'affiche tant qu'aucune photo réelle n'est fournie.
export function PhotoGallery({ photos }: Props) {
  const list = (photos ?? []).filter(p => typeof p === 'string' && p.length > 0);
  if (list.length === 0) return null;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.scroll}
    >
      {list.map((uri, i) => (
        <Image key={`${uri}-${i}`} source={{ uri }} style={styles.thumb} resizeMode="cover" />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { marginBottom: Spacing.lg },
  content: { gap: Spacing.sm, paddingRight: Spacing.md },
  thumb: {
    width: 150,
    height: 190,
    borderRadius: Radius.lg,
    backgroundColor: Colors.cremeF,
  },
});
