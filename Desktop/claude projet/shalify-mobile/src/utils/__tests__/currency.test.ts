import { convertPrice, getCurrencyLabel, CURRENCIES } from '../currency';

describe('convertPrice', () => {
  it('retourne TND sans conversion', () => {
    expect(convertPrice(100, 'TND')).toBe('100 TND');
  });

  it('convertit en EUR', () => {
    expect(convertPrice(100, 'EUR')).toBe('€29');
  });

  it('convertit en USD', () => {
    expect(convertPrice(100, 'USD')).toBe('$32');
  });

  it('liste toutes les devises', () => {
    expect(CURRENCIES).toEqual(['TND', 'EUR', 'USD', 'GBP', 'MAD', 'CAD']);
  });
});

describe('getCurrencyLabel', () => {
  it('retourne label EUR', () => {
    expect(getCurrencyLabel('EUR')).toBe('EUR (€)');
  });

  it('retourne label TND', () => {
    expect(getCurrencyLabel('TND')).toBe('TND (TND)');
  });
});
