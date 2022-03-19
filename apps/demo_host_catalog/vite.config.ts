// vite.config.ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	server:{
		cors: {
			"origin": "*",
			"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
			"preflightContinue": false,
			"optionsSuccessStatus": 204
		},
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
		},
	},
	plugins: [
		solidPlugin(),
		federation({
			name: "host",
			remotes: {
				'solidCart': 'http://localhost:8888/assets/remoteentry.js',
			},
		})
	],
});
