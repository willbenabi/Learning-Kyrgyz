import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Vite HMR configuration
// For remote development, set DEV_HMR_HOST environment variable
const hmrHost = process.env.DEV_HMR_HOST || 'localhost'
const hmrProtocol = process.env.DEV_HMR_HOST ? 'wss' : 'ws'
const hmrClientPort = process.env.DEV_HMR_HOST ? 443 : undefined

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    RubyPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app/frontend'),
    },
  },
  server: {
    hmr: {
      host: hmrHost,
      protocol: hmrProtocol,
      clientPort: hmrClientPort,
      overlay: false, // Disable Vite's error overlay - use our own with "Send to Chat"
    },
  },
})
