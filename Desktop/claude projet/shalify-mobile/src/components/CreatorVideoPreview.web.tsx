import React from 'react';
import { Radius, Colors, Spacing } from '../theme';
import { estVideoLisible } from './VideoPlayer.web';

interface Props {
  videoUrl?: string;
  height?: number;
}

// Aperçu vidéo en boucle courte sur la carte, seulement si le créateur a une
// vidéo lisible. Muet, en boucle, sans son : une ambiance douce, jamais bruyante.
export function CreatorVideoPreview({ videoUrl, height = 150 }: Props) {
  if (!estVideoLisible(videoUrl)) return null;
  const h: any = React.createElement;
  return h(
    'div',
    {
      style: {
        borderRadius: Radius.md,
        overflow: 'hidden',
        marginTop: Spacing.md,
        backgroundColor: Colors.vertTF,
      },
    },
    h('video', {
      src: videoUrl,
      muted: true,
      loop: true,
      autoPlay: true,
      playsInline: true,
      preload: 'metadata',
      'aria-hidden': 'true',
      style: {
        width: '100%',
        height,
        objectFit: 'cover',
        display: 'block',
      },
    }),
  );
}
