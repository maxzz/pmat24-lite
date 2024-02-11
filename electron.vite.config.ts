import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    main: {
        build: {
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/electron/app/index.ts'),
                }
            }
        },
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        build: {
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/electron/preload/index.ts')
                }
            }
        },
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src')
            }
        },
        plugins: [react()]
    }
});
