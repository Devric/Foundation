const react = require('@vitejs/plugin-react')

/**
* @type {import('vite').UserConfig}
*/
module.exports = {
	plugins: [
		react({
			babel: {
				plugins: [
				'babel-plugin-macros',
				[
					'@emotion/babel-plugin-jsx-pragmatic',
					{
					export: 'jsx',
					import: '__cssprop',
					module: '@emotion/react',
					},
				],
				[
					'@babel/plugin-transform-react-jsx',
					{ pragma: '__cssprop' },
					'twin.macro',
				],
				],
			},
		}),
	],
	// Use for emotion/react to auto inject jsx, this allows components to have css={} property
	esbuild: {
		jsxFactory: `jsx`,
    	jsxInject: `import { jsx } from '@emotion/react'`,
	},

	build: {
		minify: false
	}
}
