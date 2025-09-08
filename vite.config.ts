import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon-180x180.png',
        'maskable-icon-512x512.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        // se quiser também os splash screens
        'apple-splash-640-1136.jpg',
        'apple-splash-750-1334.jpg',
        'apple-splash-828-1792.jpg',
        'apple-splash-1125-2436.jpg',
        // etc...
      ],
      manifest: {
        name: 'FinanceApp - Controle Financeiro',
        short_name: 'FinanceApp',
        description: 'Aplicativo completo para controle de finanças pessoais',
        theme_color: '#10B981',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        id: 'com.financeapp.pwa',
        categories: ['finance', 'productivity', 'business'],
        lang: 'pt-BR',
        dir: 'ltr',
        icons: [
          {
            src: '/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/apple-touch-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          }
        ],
        screenshots: [
          {
            src: '/screenshot-wide.png',
            sizes: '1280x720',
            type: 'image/png',
            label: 'Dashboard principal do FinanceApp'
          },
          {
            src: '/screenshot-narrow.png',
            sizes: '750x1334',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Visão mobile do FinanceApp'
          }
        ],
        shortcuts: [
          {
            name: 'Adicionar Receita',
            short_name: 'Nova Receita',
            description: 'Adicionar uma nova receita rapidamente',
            url: '/income/new',
            icons: [
              {
                src: '/shortcut-income.png',
                sizes: '96x96',
                type: 'image/png'
              }
            ]
          },
          {
            name: 'Adicionar Gasto',
            short_name: 'Novo Gasto',
            description: 'Registrar um novo gasto',
            url: '/expenses/new',
            icons: [
              {
                src: '/shortcut-expense.png',
                sizes: '96x96',
                type: 'image/png'
              }
            ]
          },
          {
            name: 'Ver Relatórios',
            short_name: 'Relatórios',
            description: 'Visualizar relatórios financeiros',
            url: '/reports',
            icons: [
              {
                src: '/shortcut-reports.png',
                sizes: '96x96',
                type: 'image/png'
              }
            ]
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  server: {
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          icons: ['lucide-react']
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
