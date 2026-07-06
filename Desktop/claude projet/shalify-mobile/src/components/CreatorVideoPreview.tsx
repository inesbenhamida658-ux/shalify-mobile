import React from 'react';
import { View } from 'react-native';

interface Props {
  videoUrl?: string;
  height?: number;
}

// Aperçu vidéo en boucle courte sur la carte créateur.
// Version native : repli neutre (rien) — l'aperçu en boucle est web.
// La vraie lecture reste disponible sur la fiche via VideoPlayer.
export function CreatorVideoPreview(_props: Props) {
  return <View />;
}
