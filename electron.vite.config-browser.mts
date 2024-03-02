import { join, resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log('------ electron.vite.config-browser.ts:__dirname =', __dirname);

// https://vitejs.dev/config
export default defineConfig(() => {
    return {
        base: '',
        root: resolve(__dirname, 'src/renderer'),
        // build: {
        //     rollupOptions: {
        //         input: resolve(__dirname, 'src/renderer/index.html'),
        //     },
        // },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src/renderer/src'),
                '@ui': resolve(__dirname, 'src/renderer/src/ui'),
                '@renderer': resolve(__dirname, 'src/renderer/src'),
                '@electron': resolve(__dirname, 'src/electron/app'),
                "@shared": resolve(__dirname, 'src/shared'),
            }
        },
        plugins: [react()],
        server: {
            port: 3000,
        }
    };
});
