import { defineConfig } from ‘vite’
import react from ‘@vitejs/plugin-react’

export default defineConfig({
plugins: [react()],
// Change ‘og-model-hub’ to your actual GitHub repo name
base: ‘/Open Gradient Model Hub/’,
})
