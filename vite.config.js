import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      // 👇 PERBAIKAN: Tambahkan 'index.html' agar di-cache saat instalasi SW
      includeAssets: ['index.html', 'icons/icon-192x192.png', 'icons/icon-512x512.png'], 
      manifest: {
        name: 'Daily Quotes App',
        short_name: 'DailyQuotes',
        description: 'Aplikasi inspirasi harian Anda',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // 👇 PERBAIKAN: Tambahkan strategi caching untuk halaman utama (App Shell)
        runtimeCaching: [
          {
            // Aturan untuk API Supabase (sama seperti sebelumnya)
            urlPattern: ({ url }) => url.pathname.startsWith('/rest/v1/'),
            handler: 'NetworkFirst', 
            options: {
              cacheName: 'supabase-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 
              }
            }
          },
          // 👇 BARU: Strategi caching untuk rute utama (App Shell)
          {
            urlPattern: ({ url }) => url.pathname === '/' || url.pathname.endsWith('.html'),
            handler: 'StaleWhileRevalidate', // Strategi: Ambil dari cache dulu, lalu update di background
            options: {
              cacheName: 'app-shell-cache'
            }
          }
        ]
      }
    })
  ],
})