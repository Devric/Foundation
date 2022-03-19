// vite.config.ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		solidPlugin(),
		federation({
			name: 'solidCart',
			filename: 'remoteEntry.js',
			exposes: {
				'./Cart': './src/Cart.tsx',
			},
			// shared: ['vue']
		})
	],
});
