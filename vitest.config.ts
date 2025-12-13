import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./app/frontend/test/setup.ts'],
    include: ['app/frontend/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['app/frontend/**/*.{ts,tsx}'],
      exclude: [
        'app/frontend/**/*.{test,spec}.{ts,tsx}',
        'app/frontend/test/**',
        'app/frontend/types/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app/frontend'),
    },
  },
})
