import React, { useState } from 'react';
import { Alert, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppButton } from './AppButton';
import { startCheckout, ItemPayant } from '../services/payments';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';

interface Props {
  item: ItemPayant;
  label?: string;
  style?: ViewStyle;
}

// Bouton achat générique (formation, live, etc.). Enregistre la réservation
// côté site puis ouvre la page de paiement hébergée (aucun secret côté app).
export function BuyButton({ item, label, style }: Props) {
  const { user, token } = useAuth();
  const { t } = useLang();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    if (!user) {
      Alert.alert(t('booking_login_requis'));
      return;
    }
    setLoading(true);
    try {
      const res = await startCheckout({ item, user, token: token ?? undefined });
      if (res.paiementOuvert) {
        Alert.alert(t('booking_confirme_titre'), t('booking_confirme_msg'));
        navigation.navigate('ThankYou');
      } else if (res.reservationEnregistree) {
        Alert.alert(t('booking_confirme_titre'), t('booking_lien_manuel'));
        navigation.navigate('ThankYou');
      } else {
        Alert.alert(t('erreur_generique'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppButton
      label={label ?? t('booking_payer_ziina')}
      onPress={onPress}
      loading={loading}
      variant="primary"
      style={style}
    />
  );
}
