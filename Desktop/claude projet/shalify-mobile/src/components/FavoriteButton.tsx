import React, { useEffect, useState, useCallback, useRef } from 'react';
import { TouchableOpacity, ViewStyle, Animated } from 'react-native';
import { Glyph } from './Glyph';
import { Colors } from '../theme';
import { getFavorites, addFavorite, removeFavorite } from '../storage';
import { useLang } from '../context/LangContext';

interface Props {
  creatorId: string;
  style?: ViewStyle;
}

// Bouton coeur — ajoute / retire un créateur des favoris (persistance locale AsyncStorage).
// Zéro dépendance serveur, zéro secret.
export function FavoriteButton({ creatorId, style }: Props) {
  const { t } = useLang();
  const [liked, setLiked] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const refresh = useCallback(async () => {
    const ids = await getFavorites();
    setLiked(ids.includes(creatorId));
  }, [creatorId]);

  useEffect(() => { refresh(); }, [refresh]);

  // Pulsation visuelle au toucher (équivalent web-safe de l'haptique).
  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.25, duration: 110, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, tension: 120, useNativeDriver: true }),
    ]).start();
  };

  const toggle = async () => {
    pulse();
    if (liked) {
      await removeFavorite(creatorId);
      setLiked(false);
    } else {
      await addFavorite(creatorId);
      setLiked(true);
    }
  };

  return (
    <TouchableOpacity
      onPress={toggle}
      style={style}
      accessibilityRole="button"
      accessibilityLabel={liked ? t('favoris_retirer') : t('favoris_ajouter')}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Glyph size={24} color={liked ? Colors.or : Colors.blanc}>{liked ? '♥' : '♡'}</Glyph>
      </Animated.View>
    </TouchableOpacity>
  );
}
