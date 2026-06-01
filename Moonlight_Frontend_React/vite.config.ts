import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "@hooks": "/src/hooks",
      "@services": "/src/services",
      "@utils": "/src/utils",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@types": "/src/@types",
    },
  },
  test: {
    globals: true,
    environment: "jsdom", // importante pra React
    coverage: {
      provider: "v8",
    },
  },
})
