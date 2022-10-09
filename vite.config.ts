import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      vue(),
      // VitePWA,
    ],
    server: {
      host: process.env.VITE_SERVER_HOST,
      port: process.env.VITE_SERVER_PORT ?? 3000,
      https: process.env.VITE_SERVER_HTTPS_CERT ? {
        cert: process.env.VITE_SERVER_HTTPS_CERT,
        key: process.env.VITE_SERVER_HTTPS_KEY,
        ciphers: process.env.VITE_SERVER_HTTPS_CIPHERS,
      } : false,
    },
    define: {
      '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
    },
    build: {
      outDir: 'dist/' + process.env.npm_package_version,
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  })
}
