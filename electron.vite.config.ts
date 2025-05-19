import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
//console.log('------ electron.vite.config.ts:__dirname =', __dirname);

const __dirnameEsm = dirname(fileURLToPath(import.meta.url));

console.log(`------- electron.vite.config.mts: __dirname = "${__dirnameEsm}"`);

function absPath(path: string) {
    return resolve(__dirnameEsm, path);
}

export default defineConfig({
    main: {
        build: {
            rollupOptions: {
                input: {
                    index: absPath('src/shell/app/index.ts'),
                },
                // output: { dir: absPath('dist-electron/main'), },
                external: [
                    'pmat_plugin_nodejs.node',
                ]
            }
        },
        resolve: {
            alias: {
                "@shared": absPath('src/shared'),
                '@electron': absPath('src/shell/app'),
                "@shell": absPath('src/shell/app'),
            }
        },
        plugins: [externalizeDepsPlugin()]
    },

    preload: {
        build: {
            rollupOptions: {
                input: {
                    index: absPath('src/shell/preload/index.ts')
                },
                // output: { dir: absPath('dist-electron/preload'), }
            }
        },
        plugins: [externalizeDepsPlugin()]
    },

    renderer: {
        resolve: {
            alias: {
                '@': absPath('src/renderer/src'),
                '@ui': absPath('src/renderer/src/ui'),
                '@renderer': absPath('src/renderer/src'),
                '@electron': absPath('src/shell/app'),
                "@shared": absPath('src/shared'),
                "@shell": absPath('src/shell/app'),
            }
        },
        build: {
            rollupOptions: { output: { manualChunks, } }, // minify: false,
        },
        plugins: [react()]
    }
});

function manualChunks(id: string) { //https://rollupjs.org/configuration-options/#output-manualchunks
    if (id.includes("react-dom")) {
        return "vendor-dom";
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
    // if (id.includes("node_modules")) {
    //     return "vendor";
    // }
}
