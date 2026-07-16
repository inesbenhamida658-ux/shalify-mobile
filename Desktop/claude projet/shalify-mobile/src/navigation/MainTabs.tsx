import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/main/HomeScreen';
import { SearchScreen } from '../screens/main/SearchScreen';
import { CreatorsScreen } from '../screens/main/CreatorsScreen';
import { RubriquesScreen } from '../screens/main/RubriquesScreen';
import { CreatorDetailScreen } from '../screens/main/CreatorDetailScreen';
import { MessagesScreen } from '../screens/main/MessagesScreen';
import { FavoritesScreen } from '../screens/main/FavoritesScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { SettingsScreen } from '../screens/main/SettingsScreen';
import { RitualScreen } from '../screens/main/RitualScreen';
import { QuizScreen } from '../screens/main/QuizScreen';
import { ReferralScreen } from '../screens/main/ReferralScreen';
import { HelpScreen } from '../screens/main/HelpScreen';
import { OffrirScreen } from '../screens/main/OffrirScreen';
import { PacksScreen } from '../screens/main/PacksScreen';
import { JournalScreen } from '../screens/main/JournalScreen';
import { EditProfileScreen } from '../screens/main/EditProfileScreen';
import { AboutScreen } from '../screens/main/AboutScreen';
import { LegalScreen } from '../screens/main/LegalScreen';
import { BibliothequeScreen } from '../screens/main/BibliothequeScreen';
import { FormationsScreen } from '../screens/main/FormationsScreen';
import { LivesScreen } from '../screens/main/LivesScreen';
import { ActualitesScreen } from '../screens/main/ActualitesScreen';
import { AudiosScreen } from '../screens/main/AudiosScreen';
import { TestScreen } from '../screens/main/TestScreen';
import { GuidanceScreen } from '../screens/main/GuidanceScreen';
import { MantraScreen } from '../screens/main/MantraScreen';
import { CompatibilityScreen } from '../screens/main/CompatibilityScreen';
import { MorningScreen } from '../screens/main/MorningScreen';
import { SubscriptionScreen } from '../screens/main/SubscriptionScreen';
import { PurchasesScreen } from '../screens/main/PurchasesScreen';
import { ProfilePreviewScreen } from '../screens/main/ProfilePreviewScreen';
import { CalmSpaceScreen } from '../screens/main/CalmSpaceScreen';
import { EmotionsScreen } from '../screens/main/EmotionsScreen';
import { BreathScreen } from '../screens/main/BreathScreen';
import { CardOfDayScreen } from '../screens/main/CardOfDayScreen';
import { WeatherScreen } from '../screens/main/WeatherScreen';
import { AffirmationScreen } from '../screens/main/AffirmationScreen';
import { VictoriesScreen } from '../screens/main/VictoriesScreen';
import { TimerScreen } from '../screens/main/TimerScreen';
import { Journey21Screen } from '../screens/main/Journey21Screen';
import { QuotesScreen } from '../screens/main/QuotesScreen';
import { LexiconScreen } from '../screens/main/LexiconScreen';
import { CalmRoomScreen } from '../screens/main/CalmRoomScreen';
import { ProgressScreen } from '../screens/main/ProgressScreen';
import { ThankYouScreen } from '../screens/main/ThankYouScreen';
import { GratitudesScreen } from '../screens/main/GratitudesScreen';
import { HistoireScreen } from '../screens/main/HistoireScreen';
import { BoutiqueScreen } from '../screens/main/BoutiqueScreen';
import { OnboardingScreen } from '../screens/main/OnboardingScreen';
import { hasSeenOnboarding } from '../services/douceur';
import { Colors } from '../theme';
import { TabBarIcon } from '../components';

export type MainTabParamList = {
  Accueil: undefined;
  Recherche: undefined;
  CreateursTab: undefined;
  Favoris: undefined;
  Messages: undefined;
  Profil: undefined;
};

export type CreateursStackParamList = {
  Rubriques: undefined;
  CreateursList: { rubrique?: string } | undefined;
  CreatorDetail: { creatorId: string };
};

// Écrans additionnels poussés au-dessus des onglets (rituel, quiz, parrainage, aide).
export type MainStackParamList = {
  Tabs: undefined;
  Ritual: undefined;
  Quiz: undefined;
  Referral: undefined;
  Help: undefined;
  Offrir: undefined;
  Packs: undefined;
  Journal: undefined;
  EditProfile: undefined;
  About: undefined;
  Legal: undefined;
  Bibliotheque: undefined;
  Formations: undefined;
  Lives: undefined;
  Actualites: undefined;
  Audios: undefined;
  Test: undefined;
  Guidance: undefined;
  Mantra: undefined;
  Compatibility: undefined;
  Morning: undefined;
  Subscription: undefined;
  Purchases: undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ProfilePreview: { profile: any };
  Settings: undefined;
  Onboarding: undefined;
  CalmSpace: undefined;
  Emotions: undefined;
  Breath: { soir?: boolean } | undefined;
  CardOfDay: undefined;
  Weather: undefined;
  Affirmation: undefined;
  Victories: undefined;
  Timer: undefined;
  Journey21: undefined;
  Quotes: undefined;
  Lexicon: undefined;
  CalmRoom: undefined;
  Progress: undefined;
  ThankYou: undefined;
  Gratitudes: undefined;
  Histoire: undefined;
  Boutique: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const CreateursStack = createNativeStackNavigator<CreateursStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

function CreateursNavigator() {
  return (
    <CreateursStack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.fond }, headerTintColor: Colors.vert, headerShadowVisible: false }}>
      <CreateursStack.Screen name="Rubriques" component={RubriquesScreen} options={{ headerShown: false }} />
      <CreateursStack.Screen name="CreateursList" component={CreatorsScreen} options={{ headerShown: true, title: '' }} />
      <CreateursStack.Screen name="CreatorDetail" component={CreatorDetailScreen} options={{ title: 'Créateur' }} />
    </CreateursStack.Navigator>
  );
}

function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.fond },
        headerTintColor: Colors.vert,
        headerShadowVisible: false,
        tabBarStyle: { backgroundColor: Colors.blanc, borderTopColor: Colors.bordure, height: 62, paddingTop: 6, paddingBottom: 8 },
        tabBarActiveTintColor: Colors.vert,
        tabBarInactiveTintColor: Colors.gris,
        tabBarLabelStyle: { fontSize: 11, marginTop: 2 },
        tabBarIconStyle: { marginTop: 2 },
      }}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} /> }} />
      <Tab.Screen name="Recherche" component={SearchScreen} options={{ tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} /> }} />
      <Tab.Screen name="CreateursTab" component={CreateursNavigator} options={{ title: 'Créateurs', tabBarIcon: ({ color }) => <TabBarIcon name="creators" color={color} /> }} />
      <Tab.Screen name="Favoris" component={FavoritesScreen} options={{ tabBarIcon: ({ color }) => <TabBarIcon name="favoris" color={color} /> }} />
      <Tab.Screen name="Messages" component={MessagesScreen} options={{ tabBarIcon: ({ color }) => <TabBarIcon name="messages" color={color} /> }} />
      <Tab.Screen name="Profil" component={ProfileScreen} options={{ tabBarIcon: ({ color }) => <TabBarIcon name="profil" color={color} /> }} />
    </Tab.Navigator>
  );
}

// Écrans de détail : petit chevron de retour natif, titre porté par l'écran lui-même.
const detailOptions = {
  headerShown: true,
  title: '',
  headerStyle: { backgroundColor: Colors.fond },
  headerTintColor: Colors.vert,
  headerShadowVisible: false,
} as const;

export function MainTabs() {
  // Onboarding : affiché une seule fois, à la toute première ouverture.
  const [seen, setSeen] = React.useState<boolean | null>(null);
  React.useEffect(() => { hasSeenOnboarding().then(setSeen); }, []);
  if (seen === null) return null;

  return (
    <MainStack.Navigator initialRouteName={seen ? 'Tabs' : 'Onboarding'}>
      <MainStack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <MainStack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
      <MainStack.Screen name="Ritual" component={RitualScreen} options={detailOptions} />
      <MainStack.Screen name="Quiz" component={QuizScreen} options={detailOptions} />
      <MainStack.Screen name="Referral" component={ReferralScreen} options={detailOptions} />
      <MainStack.Screen name="Help" component={HelpScreen} options={detailOptions} />
      <MainStack.Screen name="Offrir" component={OffrirScreen} options={detailOptions} />
      <MainStack.Screen name="Packs" component={PacksScreen} options={detailOptions} />
      <MainStack.Screen name="Journal" component={JournalScreen} options={detailOptions} />
      <MainStack.Screen name="EditProfile" component={EditProfileScreen} options={detailOptions} />
      <MainStack.Screen name="About" component={AboutScreen} options={detailOptions} />
      <MainStack.Screen name="Legal" component={LegalScreen} options={detailOptions} />
      <MainStack.Screen name="Bibliotheque" component={BibliothequeScreen} options={detailOptions} />
      <MainStack.Screen name="Formations" component={FormationsScreen} options={detailOptions} />
      <MainStack.Screen name="Lives" component={LivesScreen} options={detailOptions} />
      <MainStack.Screen name="Actualites" component={ActualitesScreen} options={detailOptions} />
      <MainStack.Screen name="Audios" component={AudiosScreen} options={detailOptions} />
      <MainStack.Screen name="Test" component={TestScreen} options={detailOptions} />
      <MainStack.Screen name="Guidance" component={GuidanceScreen} options={detailOptions} />
      <MainStack.Screen name="Mantra" component={MantraScreen} options={detailOptions} />
      <MainStack.Screen name="Compatibility" component={CompatibilityScreen} options={detailOptions} />
      <MainStack.Screen name="Morning" component={MorningScreen} options={detailOptions} />
      <MainStack.Screen name="Subscription" component={SubscriptionScreen} options={detailOptions} />
      <MainStack.Screen name="Purchases" component={PurchasesScreen} options={detailOptions} />
      <MainStack.Screen name="ProfilePreview" component={ProfilePreviewScreen} options={detailOptions} />
      <MainStack.Screen name="Settings" component={SettingsScreen} options={detailOptions} />
      <MainStack.Screen name="CalmSpace" component={CalmSpaceScreen} options={detailOptions} />
      <MainStack.Screen name="Emotions" component={EmotionsScreen} options={detailOptions} />
      <MainStack.Screen name="Breath" component={BreathScreen} options={detailOptions} />
      <MainStack.Screen name="CardOfDay" component={CardOfDayScreen} options={detailOptions} />
      <MainStack.Screen name="Weather" component={WeatherScreen} options={detailOptions} />
      <MainStack.Screen name="Affirmation" component={AffirmationScreen} options={detailOptions} />
      <MainStack.Screen name="Victories" component={VictoriesScreen} options={detailOptions} />
      <MainStack.Screen name="Timer" component={TimerScreen} options={detailOptions} />
      <MainStack.Screen name="Journey21" component={Journey21Screen} options={detailOptions} />
      <MainStack.Screen name="Quotes" component={QuotesScreen} options={detailOptions} />
      <MainStack.Screen name="Lexicon" component={LexiconScreen} options={detailOptions} />
      <MainStack.Screen name="CalmRoom" component={CalmRoomScreen} options={detailOptions} />
      <MainStack.Screen name="Progress" component={ProgressScreen} options={detailOptions} />
      <MainStack.Screen name="ThankYou" component={ThankYouScreen} options={detailOptions} />
      <MainStack.Screen name="Gratitudes" component={GratitudesScreen} options={detailOptions} />
      <MainStack.Screen name="Histoire" component={HistoireScreen} options={detailOptions} />
      <MainStack.Screen name="Boutique" component={BoutiqueScreen} options={detailOptions} />
    </MainStack.Navigator>
  );
}
