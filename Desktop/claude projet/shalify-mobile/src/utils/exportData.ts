// Sauvegarde locale exportable — version native (repli).
// Rassemble les données locales (gratitudes, victoires, journal) en texte
// et propose le partage natif. La version web (téléchargement de fichier)
// est dans exportData.web.ts.
import { Share } from 'react-native';
import { buildExportText } from './exportContent';

export { buildExportText } from './exportContent';

export type ExportResult = 'downloaded' | 'copied' | 'shared' | 'error';

export async function exportLocalData(): Promise<ExportResult> {
  try {
    const texte = await buildExportText();
    await Share.share({ message: texte });
    return 'shared';
  } catch {
    return 'error';
  }
}
