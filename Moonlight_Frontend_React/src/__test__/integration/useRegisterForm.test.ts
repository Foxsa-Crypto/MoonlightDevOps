import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRegisterForm } from '../../hooks/validation/customer/useRegisterForm';

// 1. Mock do useNavigate (para não dar erro de Router)
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// 2. Mock do serviço de registro (finge que o arquivo existe e funciona)
vi.mock('../../../services/realServices/auth.service', () => ({
  register: vi.fn(() => Promise.resolve({ data: {} })), // Sempre retorna sucesso
}));

describe('useRegisterForm Integration', () => {
  it('deve atualizar o estado de campos corretamente', () => {
    const { result } = renderHook(() => useRegisterForm());

    act(() => {
      result.current.setField('name')('Arthur Pelito');
    });

    expect(result.current.fields.name).toBe('Arthur Pelito');
  });

  it('deve formatar o CPF automaticamente ao usar setCpf', () => {
    const { result } = renderHook(() => useRegisterForm());

    act(() => {
      result.current.setCpf('12345678901');
    });

    // O formatCPF que você criou deve colocar os pontos e traço
    expect(result.current.fields.cpf).toBe('123.456.789-01');
  });

  it('deve ativar o loading ao submeter um formulário válido', async () => {
    const { result } = renderHook(() => useRegisterForm());

    // Preenche tudo para ficar válido
    act(() => {
      result.current.setField('name')('Arthur');
      result.current.setField('email')('teste@teste.com');
      result.current.setCpf('12345678901');
      result.current.setField('password')('Senha123!');
      result.current.setField('confirmPassword')('Senha123!');
    });

    // Submete
    await act(async () => {
      result.current.handleSubmit();
    });

    // Como o handleSubmit é async, verificamos se ele tentou processar
    expect(result.current.ui.submitted).toBe(true);
  });
});