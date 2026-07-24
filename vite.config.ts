import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/baby-care-app/',
  server: { host: '0.0.0.0', port: 5173 },
})
