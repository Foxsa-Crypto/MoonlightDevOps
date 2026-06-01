import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCategoryForm } from '../../hooks/validation/Admin/useCategoryForm'; // Ajuste o caminho conforme sua estrutura

// 1. Mock do useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// 2. Mock dos serviços de Categoria (Hoisting para evitar carregar o arquivo real)
vi.mock('../../../services/realServices/category.service', () => ({
  createCategory: vi.fn(() => Promise.resolve({ data: {} })),
  updateCategory: vi.fn(() => Promise.resolve({ data: {} })),
}));

describe('useCategoryForm Integration', () => {
  it('deve inicializar com campos vazios no modo create', () => {
    const { result } = renderHook(() => useCategoryForm('create'));

    expect(result.current.fields).toEqual({
      name: "",
      description: "",
      image: "",
    });
    expect(result.current.ui.loading).toBe(false);
  });

  it('deve atualizar o estado dos campos corretamente ao digitar', () => {
    const { result } = renderHook(() => useCategoryForm('create'));

    act(() => {
      result.current.setField('name')('RPG');
      result.current.setField('description')('Jogos de interpretação');
    });

    expect(result.current.fields.name).toBe('RPG');
    expect(result.current.fields.description).toBe('Jogos de interpretação');
  });

  it('deve resetar o apiError ao começar a digitar em um campo', () => {
    const { result } = renderHook(() => useCategoryForm('create'));

    // Forçamos um erro de API manual para testar o reset
    act(() => {
      result.current.setField('name')('Ação');
    });

    expect(result.current.ui.apiError).toBe(null);
  });

});