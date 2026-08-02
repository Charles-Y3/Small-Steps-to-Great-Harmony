import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// The portal is installable so the header's "Install" button has
// something real to trigger — most visitors will just browse, but the
// option is there for anyone who wants a shortcut back to the index.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: ['icons/favicon.ico', 'icons/apple-touch-icon.png', 'icons/small-steps-to-great-harmony-icon.png'],
      manifest: {
        name: 'Small Steps to Great Harmony 小步向大同',
        short_name: 'Small Steps',
        description: 'Six small personal projects about wisdom, reflection, and everyday practice.',
        theme_color: '#2f2c29',
        background_color: '#faf8f4',
        display: 'standalone',
        icons: [
          { src: 'icons/icon192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/iconMaskable512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,json}'],
      },
    }),
  ],
});
