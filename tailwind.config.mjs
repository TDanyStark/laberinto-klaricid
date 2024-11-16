/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				azul_oscuro: '#002a3a',
				azul_claro: '#004c97',
				amarillo_abbott : '#ffd100',
				blanco_abbott: '#ffffff',
				negro_abbott: '#000000',
			},
			fontFamily:{
				georgia : ['Georgia', 'ui-serif'],
        brandon: ['Brandon', 'ui-serif']
			}
		},
	},
	plugins: [],
}
