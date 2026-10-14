import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatCurrency.js';

// Intl в ru-RU разделяет разряды неразрывным пробелом, для тестов приводим к обычному
const norm = (value) => value.replace(/\s/g, ' ');

describe('formatCurrency', () => {
  it('should format rubles with default currency', () => {
    expect(norm(formatCurrency(1234.5))).toBe('1 234,50 ₽');
  });

  it('should format USD with en-US locale', () => {
    expect(norm(formatCurrency(99.9, 'USD', 'en-US'))).toBe('$99.90');
  });

  it('should format EUR with de-DE locale', () => {
    expect(norm(formatCurrency(1000, 'EUR', 'de-DE'))).toBe('1.000,00 €');
  });

  it('should accept lowercase currency code', () => {
    expect(norm(formatCurrency(5, 'usd', 'en-US'))).toBe('$5.00');
  });

  it('should format zero', () => {
    expect(norm(formatCurrency(0, 'USD', 'en-US'))).toBe('$0.00');
  });

  it('should format negative amounts', () => {
    expect(norm(formatCurrency(-42.5, 'USD', 'en-US'))).toBe('-$42.50');
  });

  it('should throw error for non-number amount', () => {
    expect(() => formatCurrency('100')).toThrow('Amount must be a finite number');
  });

  it('should throw error for NaN and Infinity', () => {
    expect(() => formatCurrency(NaN)).toThrow('Amount must be a finite number');
    expect(() => formatCurrency(Infinity)).toThrow('Amount must be a finite number');
  });

  it('should throw error for invalid currency code', () => {
    expect(() => formatCurrency(100, 'RUBLE')).toThrow('Currency must be a 3-letter ISO code');
  });

  it('should keep well-formed but unknown currency code as is', () => {
    expect(norm(formatCurrency(100, 'XYZ'))).toContain('XYZ');
  });
});
