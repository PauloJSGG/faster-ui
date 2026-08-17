import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Storybook's react-vite framework picks this file up automatically, which is
// what resolves the `@` alias and Tailwind for the stories. The published
// library is built by tsup instead; see tsup.config.ts.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
