// Sauvegarde locale exportable — version web.
// Télécharge un fichier texte des données locales, avec repli copie
// dans le presse-papiers si le téléchargement n'est pas possible.
import { buildExportText } from './exportContent';

export { buildExportText } from './exportContent';

function download(texte: string): boolean {
  try {
    if (typeof document === 'undefined') return false;
    const blob = new Blob([texte], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shalify-ma-sauvegarde.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch {
    return false;
  }
}

async function copy(texte: string): Promise<boolean> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = (typeof navigator !== 'undefined' ? navigator : null) as any;
    if (nav?.clipboard?.writeText) {
      await nav.clipboard.writeText(texte);
      return true;
    }
  } catch { /* ignore */ }
  return false;
}

export type ExportResult = 'downloaded' | 'copied' | 'shared' | 'error';

export async function exportLocalData(): Promise<ExportResult> {
  const texte = await buildExportText();
  if (download(texte)) return 'downloaded';
  if (await copy(texte)) return 'copied';
  return 'error';
}
