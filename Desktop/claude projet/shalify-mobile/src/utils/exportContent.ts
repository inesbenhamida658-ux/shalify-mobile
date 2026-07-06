// Construit le texte de sauvegarde locale (gratitudes, victoires, journal).
// Partagé entre la version web et la version native. Zéro donnée serveur.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGratitude } from '../services/rituel';
import { getVictoires } from '../services/douceur';

interface JournalEntry { texte: string; date: string; }

export async function buildExportText(now: Date = new Date()): Promise<string> {
  const gratitudes = await getGratitude().catch(() => []);
  const victoires = await getVictoires().catch(() => []);
  let journal: JournalEntry[] = [];
  try {
    const raw = await AsyncStorage.getItem('shalify_journal');
    if (raw) journal = JSON.parse(raw);
  } catch { /* ignore */ }

  const lignes: string[] = [];
  lignes.push('Shalify — ma sauvegarde');
  lignes.push(`Créée le ${now.toLocaleDateString()}`);
  lignes.push('');

  lignes.push('Mes gratitudes');
  if (gratitudes.length === 0) lignes.push('  (à venir)');
  gratitudes.forEach(g => lignes.push(`  ${g.date} · ${g.text}`));
  lignes.push('');

  lignes.push('Mes petites victoires');
  if (victoires.length === 0) lignes.push('  (à venir)');
  victoires.forEach(v => lignes.push(`  ${v.date} · ${v.text}`));
  lignes.push('');

  lignes.push('Mon journal');
  if (journal.length === 0) lignes.push('  (à venir)');
  journal.forEach(j => lignes.push(`  ${j.date} · ${j.texte}`));
  lignes.push('');

  lignes.push('Prends soin de toi. Shalify');
  return lignes.join('\n');
}
