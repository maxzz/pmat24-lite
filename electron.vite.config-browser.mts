import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig, type PluginOption, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

const __dirnameEsm = dirname(fileURLToPath(import.meta.url));

console.log(`------- electron.vite.config-browser.mts: __dirname = "${__dirnameEsm}"`);

function absPath(path: string) {
    return resolve(__dirnameEsm, path);
}

export default defineConfig((): UserConfig => { // https://vitejs.dev/config
    return {
        base: '',
        root: absPath('src/renderer'),
        publicDir: absPath('public'),
        // build: { rollupOptions: { input: absPath('src/renderer/index.html'), }, },

        build: {
            rollupOptions: { output: { manualChunks } },
            // minify: false,
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
            }) as PluginOption,
        ],

        server: { port: 3000, },
    };
});

//TODO: the same problem: no React.Children when run 'p build:web' and 'p build:web:preview'
function manualChunks(id: string) { //https://rollupjs.org/configuration-options/#output-manualchunks

    // const dd = [
    //     "@babel/runtime",
    //     "highlight",
    //     "lowlight",
    //     "prismjs",
    //     "refractor",
    // ]

    //printId(id);

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

const root = "C:/y/w/2-web/0-dp/pmat24-lite";
const rootNodeModules = `${root}/node_modules/`;
const rootSrc = `${root}/src/`;

function printId(id: string): void {
    
    if (id.includes(rootNodeModules)) {
        const id2 = id.replace(rootNodeModules, '');
        const color = id2.includes('motion') ? 'color:orange' : id2.includes('lucide-react') ? 'color:yellow' : 'color:red';
        console.log(`%cid: ${id2}`, color);
        return;
    }

    if (id.includes(rootSrc)) {
        console.log(`%cid: ${id.replace(rootSrc, '')}`, 'color:green');
        return;
    }

    console.log(`%cid: ${id}`, 'color:blue');
}
