# Paiement Shalify Mobile — Ziina

## Principe
L'app utilise une architecture de paiement neutre. Le fournisseur actif est **Ziina**
(adapté au compte bancaire de Dubaï). Le paiement passe par une **page de paiement
hébergée Ziina** (un lien public). L'app ouvre simplement ce lien dans le navigateur.

Avantages pour la situation actuelle :
- Fonctionne avec un compte particulier (aucune entreprise requise).
- Aucune clé secrète dans l'app ni dans Git.
- Aucune carte bancaire stockée par Shalify.
- Aucune modification des routes de paiement existantes du site.

## Flux
1. Le client choisit un service sur la fiche d'un créateur.
2. Il appuie sur « Réserver et payer ».
3. L'app enregistre la réservation côté site (`POST /api/reservations`, statut
   `paiement_a_confirmer`, commission 25% calculée côté site).
4. L'app ouvre la page de paiement Ziina (`EXPO_PUBLIC_ZIINA_PAYMENT_URL`).
5. Le client paie sur Ziina. Le montant arrive sur le compte Dubaï.
6. L'admin / le créateur voit la réservation et la confirme dès réception du paiement.

## Configuration
Variables publiques (préfixe `EXPO_PUBLIC_`, aucune valeur secrète) :

| Variable | Rôle | Défaut |
|---|---|---|
| `EXPO_PUBLIC_PAYMENT_PROVIDER` | Fournisseur actif (`ziina` ou `none`) | `ziina` |
| `EXPO_PUBLIC_ZIINA_PAYMENT_URL` | Lien de paiement Ziina | `https://pay.ziina.com/shalify` |

Pour changer le lien Ziina : modifier `EXPO_PUBLIC_ZIINA_PAYMENT_URL` dans `.env.local`
(non commité) ou dans les variables EAS, puis relancer / rebuild l'app.

## Évolution possible (plus tard)
- Liens Ziina par montant / par service (un lien dédié par service).
- Webhook Ziina côté serveur pour passer la réservation en `paye` automatiquement
  (nécessite une clé API Ziina côté serveur uniquement, jamais dans l'app).
