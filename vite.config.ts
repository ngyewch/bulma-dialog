import {defineConfig} from 'vite';
import dts from 'unplugin-dts/vite';

export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            entry: './src/index.ts',
            name: 'bulma-dialog',
            formats: ['es'],
        },
    },
    plugins: [
        dts({}),
    ],
});
