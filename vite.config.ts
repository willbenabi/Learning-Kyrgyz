import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Construct Vite HMR host from environment
const instanceName = process.env.DEV_INSTANCE_NAME
const hmrHost = instanceName ? `vite-${instanceName}.cayu.app` : 'localhost'
const hmrProtocol = instanceName ? 'wss' : 'ws'
const hmrClientPort = instanceName ? 443 : undefined

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
    },
  },
})
