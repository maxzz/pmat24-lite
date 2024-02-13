import { join, resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
                '@': join(__dirname, 'src/renderer/src'),
                '@ui': join(__dirname, 'src/renderer/src/ui'),
                '@renderer': resolve('src/renderer/src'),
                '@electron': resolve('src/electron/app'),
                "@shared": resolve('src/shared'),
            }
        },
        plugins: [react()]
    };
});
