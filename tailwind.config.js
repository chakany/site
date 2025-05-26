import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {
				eva: {
					amber: '#FF8503',
					dark: '#0A0A0A',
					light: '#ffde8c',
				}
			},
			fontFamily: {
				'eva': ['Helvetica', 'Arial', 'sans-serif'],
				'eva-mono': ['Courier New', 'monospace'],
			},
			animation: {
				'terminal-blink': 'blink 1.2s infinite',
				'terminal-scan': 'scan 2s ease-in-out infinite',
			},
			keyframes: {
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
				scan: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(100%)' },
				},
			}
		},
	},
	plugins: [typography],
};
