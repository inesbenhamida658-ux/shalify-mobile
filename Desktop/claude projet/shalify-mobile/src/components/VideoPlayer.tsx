import React from 'react';
import { Pressable, StyleSheet, Linking } from 'react-native';
import { AppText } from './AppText';
import { Glyph } from './Glyph';
import { Colors, Radius, Spacing } from '../theme';

interface Props {
  src?: string;
  poster?: string;
  titre?: string;
  // Libellé du bouton (fourni via i18n par l'écran appelant).
  label?: string;
}

// Vrai seulement pour un fichier vidéo lisible nativement (jamais une URL YouTube).
// Aligné sur le lecteur du site (components/VideoPlayer.tsx).
export function estVideoLisible(url?: string): url is string {
  if (!url) return false;
  return (
    /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(url) ||
    url.startsWith('blob:') ||
    url.includes('blob.vercel-storage.com') ||
    url.includes('res.cloudinary.com')
  );
}

// Version native : ouvre la vidéo dans le lecteur du téléphone via Linking.
// (La version web `.web.tsx` affiche un lecteur intégré comme le site.)
export function VideoPlayer({ src, titre, label }: Props) {
  if (!estVideoLisible(src)) return null;
  return (
    <Pressable style={styles.box} onPress={() => Linking.openURL(src).catch(() => {})}>
      <Glyph size={26} color={Colors.blanc}>▶</Glyph>
      <AppText variant="label" color="white" style={{ marginTop: Spacing.sm }}>
        {label ?? titre ?? 'Regarder la vidéo'}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.vertTF,
    borderRadius: Radius.lg,
    aspectRatio: 16 / 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
});
