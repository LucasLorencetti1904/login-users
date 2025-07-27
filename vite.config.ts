import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths({ projects: ['./tsconfig.base.json'] })],
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.test.ts']
  }
})