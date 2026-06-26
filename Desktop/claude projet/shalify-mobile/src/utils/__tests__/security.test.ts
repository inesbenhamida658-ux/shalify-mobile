import { validateApiUrl, sanitizeDisplay } from '../security';

describe('validateApiUrl', () => {
  it('accepte une URL https valide', () => {
    expect(validateApiUrl('https://shalify.app')).toBe(true);
  });

  it('rejette http', () => {
    expect(validateApiUrl('http://shalify.app')).toBe(false);
  });

  it('rejette localhost', () => {
    expect(validateApiUrl('http://localhost:3000')).toBe(false);
  });

  it('rejette vide', () => {
    expect(validateApiUrl('')).toBe(false);
  });
});

describe('sanitizeDisplay', () => {
  it('supprime les chevrons', () => {
    expect(sanitizeDisplay('<script>alert(1)</script>')).toBe('scriptalert(1)/script');
  });

  it('trim les espaces', () => {
    expect(sanitizeDisplay('  hello  ')).toBe('hello');
  });
});
