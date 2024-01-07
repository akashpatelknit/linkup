import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react({ include: '**/*.jsx' })],
	scripts: {
		dev: 'vite',
		build: 'vite build',
		preview: 'vite preview',
		host: true,
	},
	build: {
		chunkSizeWarningLimit: 1600,
	},
});
