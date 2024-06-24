import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		dts({
			insertTypesEntry: true,
			rollupTypes     : true,
			outDir          : 'dist/types',
		}) as unknown as Plugin
	],
	build  : {
		sourcemap    : true,
		cssCodeSplit : false,
		lib          : {
			formats : [ 'es' ],
			entry   : resolve(__dirname, 'src/main.ts'),
			name    : 'MyLib',
			fileName: format => `lib.${format}.js`
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: [
				/node_modules/
			]
		}
	},
});
