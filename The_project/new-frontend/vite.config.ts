// new-frontend/vite.config.ts (Note the .ts extension)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <-- Add this import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Keep your existing React plugin
    tailwindcss(), // <-- Add the Tailwind CSS Vite plugin here
  ],
});