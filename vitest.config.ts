//@ts-ignore
import path from 'path';
import { defineConfig } from 'vitest/config';

const root = path.resolve(__dirname, 'src');

export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './setupTests.ts',
		include: [
			'src/components/**/*.test.ts',
			'src/components/**/*.test.tsx',
			'src/test/**/*.test.ts',
			'src/test/**/*.test.tsx',
		],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/components/**/*.{ts,tsx}', 'src/helpers/**/*.{ts,tsx}'],
			exclude: ['src/storybook/**/*.stories.{ts,tsx}'],
		},
		alias: {
			'@': root,
		},
	},
});
