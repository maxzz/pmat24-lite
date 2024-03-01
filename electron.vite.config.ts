import { join, resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    main: {
        build: {
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/shell/app/index.ts'),
                }
            }
        },
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        build: {
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/shell/preload/index.ts')
                }
            }
        },
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@': join(__dirname, 'src/renderer/src'),
                '@ui': join(__dirname, 'src/renderer/src/ui'),
                '@renderer': resolve('src/renderer/src'),
                '@electron': resolve('src/shell/app'),
                "@shared": resolve('src/shared'),
            }
        },
        plugins: [react()]
    }
});
