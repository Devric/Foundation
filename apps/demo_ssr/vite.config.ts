const react = require('@vitejs/plugin-react')

/**
* @type {import('vite').UserConfig}
*/
module.exports = {
	plugins: [
		react({
			// allow emotion to compile properly
			jsxImportSource: "@emotion/react",
			babel: {
				plugins: ["@emotion/babel-plugin"],
			},
		}),
	],
	// Use for emotion/react to auto inject jsx, this allows components to have css={} property
	esbuild: {
		jsxFactory: `jsx`,
    	jsxInject: `import { jsx, css } from '@emotion/react'`,
	},

	build: {
		minify: false
	}
}
