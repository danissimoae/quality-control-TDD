const CURRENCY_CODE = /^[A-Za-z]{3}$/;

export const formatCurrency = (amount, currency = 'RUB', locale = 'ru-RU') => {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    throw new Error('Amount must be a finite number');
  }
  if (typeof currency !== 'string' || !CURRENCY_CODE.test(currency)) {
    throw new Error('Currency must be a 3-letter ISO code');
  }

  // Intl не знает списка ISO 4217, поэтому код проверяем сами
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
};
