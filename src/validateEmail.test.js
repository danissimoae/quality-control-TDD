import { describe, it, expect } from 'vitest';
import { validateEmail } from './validateEmail.js';

// Задание 3: тесты написаны до реализации (TDD, red -> green)
describe('validateEmail', () => {
  describe('valid emails', () => {
    it.each([
      'user@example.com',
      'first.last@example.com',
      'user+tag@example.co.uk',
      'USER_1@EXAMPLE.COM',
      'a@b.io',
      'user-name@my-domain.com',
    ])('should accept %s', (email) => {
      expect(validateEmail(email)).toBe(true);
    });
  });

  describe('invalid emails', () => {
    it.each([
      ['not-an-email', 'no @ at all'],
      ['user@@example.com', 'two @'],
      ['@example.com', 'empty local part'],
      ['user@', 'empty domain'],
      ['user@example', 'no TLD'],
      ['user@.com', 'domain starts with dot'],
      ['user@example.', 'trailing dot in domain'],
      ['user@-example.com', 'label starts with hyphen'],
      ['user@example-.com', 'label ends with hyphen'],
      ['user name@example.com', 'space inside'],
      [' user@example.com', 'leading space'],
      ['user@example.com ', 'trailing space'],
      ['.user@example.com', 'local starts with dot'],
      ['user.@example.com', 'local ends with dot'],
      ['us..er@example.com', 'double dot in local'],
      ['пользователь@пример.рф', 'cyrillic characters'],
      ['user@example.c', 'TLD shorter than 2 letters'],
    ])('should reject %s (%s)', (email) => {
      expect(validateEmail(email)).toBe(false);
    });

    it('should reject non-string input', () => {
      expect(validateEmail(null)).toBe(false);
      expect(validateEmail(undefined)).toBe(false);
      expect(validateEmail(12345)).toBe(false);
      expect(validateEmail({})).toBe(false);
    });

    it('should reject empty string', () => {
      expect(validateEmail('')).toBe(false);
    });

    it('should reject local part longer than 64 chars', () => {
      expect(validateEmail(`${'a'.repeat(65)}@example.com`)).toBe(false);
    });

    it('should reject email longer than 254 chars', () => {
      const email = `${'a'.repeat(64)}@${'b'.repeat(200)}.com`;
      expect(validateEmail(email)).toBe(false);
    });
  });
});
