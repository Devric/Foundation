module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"test-red": "#F45959"
			}
		},
		fontFamily: {
			Poppins: ["Poppins, sans-serif"]
		}
	},
	plugins: [],
}
