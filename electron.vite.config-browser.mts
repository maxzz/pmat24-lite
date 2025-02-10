import { join, resolve } from 'path';
import { defineConfig, type PluginOption, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
//console.log('------ electron.vite.config-browser.ts:__dirname =', __dirname);

export default defineConfig((): UserConfig => { // https://vitejs.dev/config
    return {
        base: '',
        root: resolve(__dirname, 'src/renderer'),
        publicDir: resolve(__dirname, 'public'),
        // build: { rollupOptions: { input: resolve(__dirname, 'src/renderer/index.html'), }, },

        resolve: {
            alias: {
                "@shared": resolve(__dirname, 'src/shared'),
                '@electron': resolve(__dirname, 'src/electron/app'),
                "@shell": resolve(__dirname, 'src/shell/app'),

                '@': resolve(__dirname, 'src/renderer/src'),
                '@ui': resolve(__dirname, 'src/renderer/src/ui'),
                '@renderer': resolve(__dirname, 'src/renderer/src'),
            }
        },

        plugins: [
            react(),
            visualizer({
                filename: 'visualization.html',
                template: 'sunburst', // sunburst - d3 style (good as default as well); treemap - table (default); network - graph (slow to open).
                gzipSize: true,
                brotliSize: true,
            }) as PluginOption,
        ],

        build: {
            rollupOptions: { output: { manualChunks, } }, // minify: false,
        },

        server: { port: 3000, },
    };
});

function manualChunks(id: string) { //https://rollupjs.org/configuration-options/#output-manualchunks
    // const dd = [
    //     "@babel/runtime",
    //     "highlight",
    //     "lowlight",
    //     "prismjs",
    //     "refractor",
    // ]

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
