import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { AppText } from './AppText';
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

  const refresh = useCallback(async () => {
    const ids = await getFavorites();
    setLiked(ids.includes(creatorId));
  }, [creatorId]);

  useEffect(() => { refresh(); }, [refresh]);

  const toggle = async () => {
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
      <AppText variant="h3" color={liked ? 'or' : 'white'}>{liked ? '♥' : '♡'}</AppText>
    </TouchableOpacity>
  );
}
