// @ts-check

const { withNx } = require("@nx/next/plugins/with-nx");

const nextConfig = {
	reactStrictMode: false,
	distDir: "../../dist/apps/hugomeet/.next",
	env: {
		NX_HUGOMEET_ENDPOINT: process.env.NX_HUGOMEET_ENDPOINT,
		NX_HUGOMEET_SS_ENDPOINT: process.env.NX_HUGOMEET_SS_ENDPOINT,
	},
};

module.exports = withNx(nextConfig);
