import React from 'react';
import { View } from 'react-native';

// Icônes de la barre du bas dessinées en Views pures (zéro police, zéro emoji,
// zéro dépendance native). Rendu identique sur le web et sur Android, jamais de
// carré vide ni de symbole cassé. Couleur pilotée par l'onglet actif/inactif.
export type TabIconName = 'home' | 'search' | 'creators' | 'favoris' | 'messages' | 'profil';

// Silhouette de personne (tête + épaules), réutilisée pour Créateurs et Profil.
function Person({ color, scale = 1, opacity = 1 }: { color: string; scale?: number; opacity?: number }) {
  return (
    <View style={{ alignItems: 'center', opacity }}>
      <View style={{ width: 8 * scale, height: 8 * scale, borderRadius: 999, backgroundColor: color }} />
      <View
        style={{
          width: 14 * scale,
          height: 9 * scale,
          marginTop: 1.5 * scale,
          borderTopLeftRadius: 7 * scale,
          borderTopRightRadius: 7 * scale,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

export function TabBarIcon({ name, color }: { name: TabIconName; color: string }) {
  switch (name) {
    case 'home':
      return (
        <View style={{ width: 24, height: 22, alignItems: 'center', justifyContent: 'flex-end' }}>
          <View
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: 12,
              borderRightWidth: 12,
              borderBottomWidth: 11,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: color,
            }}
          />
          <View
            style={{
              width: 15,
              height: 10,
              marginTop: -1,
              backgroundColor: color,
              borderBottomLeftRadius: 2,
              borderBottomRightRadius: 2,
            }}
          />
        </View>
      );

    case 'search':
      return (
        <View style={{ width: 24, height: 24 }}>
          <View
            style={{
              position: 'absolute',
              top: 3,
              left: 3,
              width: 15,
              height: 15,
              borderRadius: 999,
              borderWidth: 2.4,
              borderColor: color,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 2.5,
              right: 3,
              width: 2.4,
              height: 8,
              borderRadius: 2,
              backgroundColor: color,
              transform: [{ rotate: '-45deg' }],
            }}
          />
        </View>
      );

    case 'creators':
      return (
        <View style={{ width: 26, height: 22, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
          <View style={{ marginRight: -4, marginBottom: 1 }}>
            <Person color={color} scale={0.82} opacity={0.55} />
          </View>
          <Person color={color} scale={1} />
        </View>
      );

    case 'favoris':
      return (
        <View style={{ width: 24, height: 22 }}>
          <View style={{ position: 'absolute', top: 1, left: 2, width: 11, height: 11, borderRadius: 999, backgroundColor: color }} />
          <View style={{ position: 'absolute', top: 1, right: 2, width: 11, height: 11, borderRadius: 999, backgroundColor: color }} />
          <View
            style={{
              position: 'absolute',
              top: 6,
              left: 5,
              width: 14,
              height: 14,
              backgroundColor: color,
              transform: [{ rotate: '45deg' }],
              borderRadius: 2,
            }}
          />
        </View>
      );

    case 'messages':
      return (
        <View style={{ width: 24, height: 22 }}>
          <View style={{ position: 'absolute', top: 1, left: 1, width: 22, height: 15, borderRadius: 8, backgroundColor: color }} />
          <View
            style={{
              position: 'absolute',
              bottom: 2,
              left: 5,
              width: 0,
              height: 0,
              borderTopWidth: 7,
              borderRightWidth: 8,
              borderTopColor: color,
              borderRightColor: 'transparent',
            }}
          />
        </View>
      );

    case 'profil':
      return (
        <View style={{ width: 24, height: 22, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Person color={color} scale={1.08} />
        </View>
      );
  }
}
