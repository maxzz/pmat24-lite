import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'dist/',
                'out/',
                'release/',
                '**/*.config.*',
                '**/types.ts',
            ],
        },
    },
    resolve: {
        alias: {
            '@/': resolve(__dirname, './src/renderer/src') + '/',
            '@renderer': resolve(__dirname, './src/renderer/src'),
            '@shared': resolve(__dirname, './src/shared'),
        },
    },
});
