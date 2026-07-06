import React from 'react';
import { Colors, Radius, Spacing } from '../theme';

interface Props {
  src?: string;
  poster?: string;
  titre?: string;
  label?: string;
}

// Même règle que le site : lecteur intégré seulement pour un fichier natif lisible.
export function estVideoLisible(url?: string): url is string {
  if (!url) return false;
  return (
    /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(url) ||
    url.startsWith('blob:') ||
    url.includes('blob.vercel-storage.com') ||
    url.includes('res.cloudinary.com')
  );
}

// Version web : lecteur <video> intégré, comme la fiche du site.
// createElement (au lieu de JSX) pour rester compatible avec le typecheck react-native.
export function VideoPlayer({ src, poster, titre }: Props) {
  if (!estVideoLisible(src)) return null;
  const h: any = React.createElement;
  return h(
    'div',
    {
      style: {
        borderRadius: Radius.lg,
        overflow: 'hidden',
        backgroundColor: Colors.vertTF,
        marginBottom: Spacing.lg,
      },
    },
    h('video', {
      src,
      poster,
      controls: true,
      playsInline: true,
      preload: 'metadata',
      'aria-label': titre ?? 'Vidéo de présentation',
      style: {
        width: '100%',
        aspectRatio: '16 / 9',
        display: 'block',
        backgroundColor: Colors.vertTF,
      },
    }),
  );
}
