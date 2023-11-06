import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('C:\\Private_CA\\cert-key.pem'),
      cert: fs.readFileSync('C:\\Private_CA\\cert.pem'),
      ca:fs.readFileSync('C:\\Private_CA\\ca.pem')
    }
  },
  plugins: [react()]
})
