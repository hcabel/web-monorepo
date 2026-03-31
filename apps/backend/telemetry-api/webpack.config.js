const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const path = require('path');

module.exports = {
	output: {
		path: path.join(__dirname, '../../../dist/apps/backend/telemetry-api'),
	},
	plugins: [
		new NxAppWebpackPlugin({
			target: 'node',
			compiler: 'tsc',
			main: './src/server.ts',
			tsConfig: './tsconfig.app.json',
			optimization: false,
			outputHashing: 'none',
		}),
	],
};
