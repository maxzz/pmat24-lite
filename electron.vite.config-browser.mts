import { join, resolve } from 'path';
import { defineConfig, type PluginOption, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

//console.log('------ electron.vite.config-browser.ts:__dirname =', __dirname);

// const dd = [
//     "@babel/runtime",
//     "highlight",
//     "lowlight",
//     "prismjs",
//     "refractor",
// ]

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

// https://vitejs.dev/config
export default defineConfig((): UserConfig => {
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
                "@shell": resolve(__dirname, 'src/shell/app'),
            }
        },

        plugins: [
            react(),
            visualizer({
                filename: 'visualization.html',
                template: 'sunburst', // sunburst - d3 style (good as default as well); treemap - table (default); network - graph (slow to open).
                gzipSize: true,
                brotliSize: true,
            })  as PluginOption,
        ],

        build: {
            // minify: false,
            rollupOptions: {
                output: {
                    manualChunks,
                }
            }
        },
    
        server: {
            port: 3000,
        },

    };
});
