import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'favicon.ico',
        'robots.txt',
        'icons/icon-192x192.png',
        'icons/icon-512x512.png',
      ],

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
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],

        runtimeCaching: [
          // =============================================
          // 1. Supabase Quotes Table (Full Offline Support)
          // =============================================
          {
            urlPattern: /^https:\/\/[a-z0-9.-]+\.supabase\.co\/rest\/v1\/quotes/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'quotes-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 hari
              },
            },
          },

          // =============================================
          // 2. Supabase APIs lainnya
          // =============================================
          {
            urlPattern: /^https:\/\/[a-z0-9.-]+\.supabase\.co\/rest\/v1\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 3,
              },
            },
          },

          // =============================================
          // 3. Static Assets (.js, .css)
          // =============================================
          {
            urlPattern: /^\/assets\/.*\.(js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-assets-cache',
            },
          },

          // =============================================
          // 4. Images
          // =============================================
          {
            urlPattern: /.*\.(png|jpg|jpeg|svg|gif|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },

          // =============================================
          // 5. React SPA App Shell (index.html)
          // =============================================
          {
            urlPattern: /^\/$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'app-shell',
            },
          }
        ],
      }
    })
  ],
})
