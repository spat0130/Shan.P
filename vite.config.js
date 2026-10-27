import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Short URLs on GitHub Pages: give every route its own index.html (so a direct
// visit returns 200), plus a 404.html that boots the app for anything else.
const ROUTES = ['about', 'journey', 'projects', 'contact']

function staticRoutes() {
  let outDir = 'dist'
  return {
    name: 'static-routes',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html')
      for (const route of ROUTES) {
        mkdirSync(resolve(outDir, route), { recursive: true })
        copyFileSync(index, resolve(outDir, route, 'index.html'))
      }
      copyFileSync(index, resolve(outDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), staticRoutes()],
  // GitHub Pages serves project sites from /<repo>/; the deploy workflow sets BASE_PATH.
  base: process.env.BASE_PATH || '/',
})
