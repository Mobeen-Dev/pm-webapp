import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const NGROK_HOST = "jay-willing-rodent.ngrok-free.app";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    // Allows requests from specified hosts (like ngrok)
    allowedHosts: [NGROK_HOST],
    host: true, 
    proxy: {
      // If your public content is served on a different port (e.g., port 4000)
      '/public-data': {
        target: 'http://localhost:4000', 
        changeOrigin: true, // This is key: it tricks the target server into thinking the request came from its own origin.
        rewrite: (path) => path.replace(/^\/public-data/, '')
      },
      // You can add 'secure: false' if your target is an HTTPS server with a self-signed certificate:
      // secure: false, 
    },
    // Optional: You might also need to set 'host: true' if you have binding issues
    // host: true, 
  }
})
