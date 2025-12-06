import starlightPlugin from '@astrojs/starlight-tailwind';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Accent color for the site
				accent: colors.purple,
				gray: colors.gray,
				primary: '#5147F8',
				secondary: '#003366',
			},
			fontFamily: {
				sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				heading: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [starlightPlugin(), require('@tailwindcss/typography')],
};
