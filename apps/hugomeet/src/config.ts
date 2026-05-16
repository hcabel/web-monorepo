const config = {
	url_front:
		import.meta.env.NX_HUGOMEET_ENDPOINT ??
		(typeof process !== "undefined" ? process.env.NX_HUGOMEET_ENDPOINT : undefined) ??
		"",
	url_signaling:
		import.meta.env.NX_HUGOMEET_SS_ENDPOINT ??
		(typeof process !== "undefined" ? process.env.NX_HUGOMEET_SS_ENDPOINT : undefined) ??
		"",
};

export default config;
