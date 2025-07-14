import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.REACT_APP_BACKEND_URL': '"https://proyectodesarrollosoftware-production-f819.up.railway.app/api"'
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    allowedHosts: [
      'proyectodesarrollosoftware-production-f819.up.railway.app',
      '.up.railway.app',  // Permite cualquier subdominio de railway
      'localhost'
    ]
  }
})