import { join, resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

console.log('------ electron.vite.config.ts:__dirname =', __dirname);

function manualChunks(id: string) { //https://rollupjs.org/configuration-options/#output-manualchunks
    // if (dd.some((name) => id.includes(name)) ) {
    //     return "rare";
    // }
    if (id.includes("react-dom")) {
        return "vendor-dom";
    }
    if (id.includes("node_modules")) {
        return "vendor";
    }
    if (id.includes("@radix-ui")) {
        return "radix-ui";
    }
    if (id.includes("react-syntax-highlighter")) {
        return "rare";
    }
    if (id.includes("fast-xml-parser")) {
        return "rare";
    }
}

export default defineConfig({
    main: {
        build: {
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/shell/app/index.ts'),
                },
                // output: {
                //     dir: join(__dirname, 'dist-electron/main'),
                // },
                external: [
                    'pmat_plugin_nodejs.node',
                ]
            }
        },
        resolve: {
            alias: {
                '@electron': resolve(__dirname, 'src/shell/app'),
                "@shared": resolve(__dirname, 'src/shared'),
                "@shell": resolve(__dirname, 'src/shell/app'),
            }
        },
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        build: {
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/shell/preload/index.ts')
                },
                // output: {
                //     dir: join(__dirname, 'dist-electron/preload'),
                // }
            }
        },
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src/renderer/src'),
                '@ui': resolve(__dirname, 'src/renderer/src/ui'),
                '@renderer': resolve(__dirname, 'src/renderer/src'),
                '@electron': resolve(__dirname, 'src/shell/app'),
                "@shared": resolve(__dirname, 'src/shared'),
                "@shell": resolve(__dirname, 'src/shell/app'),
            }
        },
        build: {
            // minify: false,
            rollupOptions: {
                output: {
                    manualChunks,
                }
            }
        },
        plugins: [react()]
    }
});
