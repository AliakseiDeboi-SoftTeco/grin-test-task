import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from '@svgr/rollup';

export default defineConfig({
    plugins: [react(), svgr()],
    resolve: { alias: { '@': resolve(__dirname, 'src') } },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                rewrite: (p) => p.replace(/^\/api/, ''),
            },
        },
    },
});