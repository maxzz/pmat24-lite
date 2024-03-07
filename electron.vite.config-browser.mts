import { join, resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log('------ electron.vite.config-browser.ts:__dirname =', __dirname);

// https://vitejs.dev/config
export default defineConfig(() => {
    return {
        base: '',
        // root: resolve(__dirname, 'src/renderer'),
        root: resolve(__dirname, 'src/'),
        // nested: resolve(__dirname, 'src/shared'),
        build: {
            rollupOptions: {
                // input: resolve(__dirname, 'src/renderer/index.html'),
                // input: [resolve(__dirname, 'src/renderer'), resolve(__dirname, 'src/shared'),],
                input: join(__dirname, 'src/renderer/index.html'),
            },
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src/renderer/src'),
                '@ui': resolve(__dirname, 'src/renderer/src/ui'),
                '@renderer': resolve(__dirname, 'src/renderer/src'),
                '@electron': resolve(__dirname, 'src/electron/app'),
                "@shared": resolve(__dirname, 'src/shared'),
                "@shell": resolve(__dirname, 'src/shell/app'),
            }
        },
        plugins: [react()],
        server: {
            port: 3000,
        }
    };
});
