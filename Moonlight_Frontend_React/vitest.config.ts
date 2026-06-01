import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'; // Certifique-se de ter o plugin do react

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // <--- Isso aqui é obrigatório para hooks e componentes
  },
});