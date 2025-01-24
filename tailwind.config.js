/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Inter", "sans-serif"],
		},
		fontSize: {
			h1: [
				"24px",
				{
					fontWeight: "500",
				},
			],
			p1: [
				"20px",
				{
					fontWeight: "500",
				},
			],
			p2: [
				"18px",
				{
					fontWeight: "500",
				},
			],
			p21: [
				"18px",
				{
					fontWeight: "400",
				},
			],
			p3: [
				"16px",
				{
					fontWeight: "400",
				},
			],
			p4: [
				"14px",
				{
					fontWeight: "400",
				},
			],
		},
		screens: {
			"2xl": { max: "1535px" },
			xl: { max: "1279px" },
			lg: { max: "1023px" },
			md: { max: "767px" },
			sm: { max: "639px" },
		},
		colors: {
			background: "#FCFCFC",
			"primary-black": "#242731",
			"secondary-black": "#151A1F",
			"primary-white": "#E0E4E7",
			"primary-purple": "#A162F7",
			"primary-orange": "#FF764C",
			"primary-green": "#70CF97",
			"primary-red": "#FF0015",
			"grey-1": "#A4A5A6",
			"grey-2": "#7C7C8D",
			"grey-3": "#72767C",
			"grey-border": "#E9EAEB",
		},
		boxShadow: {
			"drop-down": "0px 24px 48px -12px #1018282E",
		},
	},
	plugins: [require("tailwindcss-animate")],
};
