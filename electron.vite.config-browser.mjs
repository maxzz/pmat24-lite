import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
var __dirnameEsm = dirname(fileURLToPath(import.meta.url));
console.log("------- electron.vite.config-browser.mts: __dirname = \"".concat(__dirnameEsm, "\""));
function absPath(path) {
    return resolve(__dirnameEsm, path);
}
export default defineConfig(function () {
    return {
        base: '',
        root: absPath('src/renderer'),
        publicDir: absPath('public'),
        // build: { rollupOptions: { input: absPath('src/renderer/index.html'), }, },
        build: {
            rollupOptions: { output: { manualChunks: manualChunks } },
            //minify: false,
        },
        resolve: {
            alias: {
                "@shared": absPath('src/shared'),
                '@electron': absPath('src/electron/app'),
                "@shell": absPath('src/shell/app'),
                '@': absPath('src/renderer/src'),
                '@ui': absPath('src/renderer/src/ui'),
                '@renderer': absPath('src/renderer/src'),
            }
        },
        plugins: [
            react(),
            visualizer({
                filename: 'visualization-web.html',
                template: 'sunburst', // sunburst - d3 style (good as default as well); treemap - table (default); network - graph (slow to open).
                gzipSize: true,
                brotliSize: true,
            }),
        ],
        server: { port: 3000, },
    };
});
//TODO: the same problem: no React.Children when run 'p build:web' and 'p build:web:preview'
function manualChunks(id) {
    // const dd = [
    //     "@babel/runtime",
    //     "highlight",
    //     "lowlight",
    //     "prismjs",
    //     "refractor",
    // ]
    //console.log(`chunks: ${id}`);
    // if (id.includes("react-dom")) {
    //     return "vendor-dom";
    // }
    // if (id.includes("node_modules")) {
    //     return "vendor";
    // }
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
