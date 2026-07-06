import React from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageStyle, StyleProp } from 'react-native';
import { Colors } from '../theme';
import { Fonts } from '../fonts';
import { AppText } from './AppText';

interface Props {
  uri?: string;
  prenom?: string;
  nom?: string;
  size?: number;
  style?: ViewStyle;
}

// Palette douce pour les avatars sans photo (déterministe par nom).
const TONES = [
  { bg: '#EBF0EC', fg: Colors.vert },
  { bg: '#F6EFDD', fg: Colors.orF },
  { bg: '#E8EDE9', fg: Colors.vertF },
  { bg: '#F3E9E4', fg: '#A9793F' },
];

function initials(prenom?: string, nom?: string): string {
  const a = (prenom ?? '').trim();
  const b = (nom ?? '').trim();
  const i = (a[0] ?? '') + (b[0] ?? '');
  return (i || a.slice(0, 2) || '·').toUpperCase();
}

function toneFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return TONES[h % TONES.length];
}

export function Avatar({ uri, prenom, nom, size = 56, style }: Props) {
  const dim = { width: size, height: size, borderRadius: size / 2 };
  if (uri) {
    return <Image source={{ uri }} style={[dim, styles.img, style] as StyleProp<ImageStyle>} resizeMode="cover" />;
  }
  const tone = toneFor(`${prenom ?? ''}${nom ?? ''}`);
  return (
    <View style={[dim, styles.fallback, { backgroundColor: tone.bg }, style]}>
      <AppText style={{ fontFamily: Fonts.serifSemi, fontSize: size * 0.42, color: tone.fg }}>
        {initials(prenom, nom)}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  img: { backgroundColor: Colors.cremeF },
  fallback: { alignItems: 'center', justifyContent: 'center' },
});
