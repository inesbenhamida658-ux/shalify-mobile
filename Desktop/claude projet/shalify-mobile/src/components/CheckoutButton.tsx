import React, { useState } from 'react';
import { Alert, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppButton } from './AppButton';
import { startCheckout } from '../services/payments';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import type { Creator, Service } from '../types';

interface Props {
  creator: Creator;
  service: Service;
  style?: ViewStyle;
  label?: string;
}

// Bouton de réservation + paiement Ziina. Enregistre la réservation côté site
// puis ouvre la page de paiement hébergée Ziina (aucun secret côté app).
export function CheckoutButton({ creator, service, style, label }: Props) {
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
      const res = await startCheckout({ creator, service, user, token: token ?? undefined });
      if (res.paiementOuvert) {
        Alert.alert(t('booking_confirme_titre'), t('booking_confirme_msg'));
        navigation.navigate('ThankYou');
      } else if (res.reservationEnregistree) {
        // Réservation OK mais le lien Ziina n'a pas pu s'ouvrir : on guide le client
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
