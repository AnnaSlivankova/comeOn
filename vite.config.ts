import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'ComeON-app',
        short_name: 'ComeON',
        description: 'A simple search-and-find game',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/icon-ios.png',
            sizes: '180x180',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  define: {
    'process.env': {}
  },
  base: '/',
  server: {
    port: 3001
  }
})
