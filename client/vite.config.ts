import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        react(),
        dts({
            tsconfigPath: 'tsconfig.build.json',
        }),
        tsconfigPaths(),
    ],
    preview: {
        port: 5173,
        strictPort: true,
    },
    server: {
        port: 5173,
        strictPort: true,
        host: true,
        origin: 'http://0.0.0.0:5173',
    },
});
