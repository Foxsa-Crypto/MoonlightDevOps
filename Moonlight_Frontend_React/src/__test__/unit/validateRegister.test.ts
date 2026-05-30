import { describe, it, expect } from 'vitest';
import { getPasswordVerifiedLevel } from '../../utils/Validation/dataRules/User/userPassword';
import { isEmailValid } from '../../utils/Validation/dataRules/User/userEmail';
import { validateRegister } from '../../utils/Validation/Customer/ValidateRegister';


describe('User Validation Logic', () => {

  describe('getPasswordVerifiedLevel', () => {
    it('deve retornar nível 0 para senha vazia', () => {
      expect(getPasswordVerifiedLevel('')).toBe(0);
    });

    it('deve retornar nível 5 para uma senha forte completa', () => {
      // Atende: 8+ chars, max 16, Maiúscula, Minúscula, Número
      expect(getPasswordVerifiedLevel('Senha123')).toBe(5);
    });

    it('deve retornar nível menor que 5 se faltar número', () => {
      expect(getPasswordVerifiedLevel('SenhaSemNumero')).toBeLessThan(5);
    });
  });

  describe('isEmailValid', () => {
    it('deve validar e-mails corretos', () => {
      expect(isEmailValid('arthur@teste.com')).toBe(true);
      expect(isEmailValid('dev.fullstack@empresa.com.br')).toBe(true);
    });

    it('deve recusar e-mails sem @ ou sem ponto', () => {
      expect(isEmailValid('arthurteste.com')).toBe(false);
      expect(isEmailValid('arthur@com')).toBe(false);
    });
  });

  describe('validateRegister (Integração da Lógica)', () => {
    const validUser = {
      name: 'Arthur Pelito',
      email: 'arthur@test.com',
      password: 'StrongPassword1',
      confirmPassword: 'StrongPassword1',
      cpf: '744.846.070-69' // Assumindo que o mock do CPF valide este formato
    };

    it('deve retornar isValid: true para dados perfeitos', () => {
      const result = validateRegister(validUser);
      expect(result.isValid).toBe(true);
    });

    it('deve retornar isValid: false se as senhas não coincidirem', () => {
      const result = validateRegister({
        ...validUser,
        confirmPassword: 'DifferentPassword1'
      });
      expect(result.isValid).toBe(false);
    });

    it('deve invalidar se o nome tiver mais de 16 caracteres', () => {
      const result = validateRegister({
        ...validUser,
        name: 'Um Nome Muito Grande Para O Sistema'
      });
      expect(result.isValid).toBe(false);
    });
  });
});