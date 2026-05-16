const endpoint = import.meta.env.NX_PORTFOLIO_ENDPOINT ?? "";

export default function App() {
	return (
		<main
			style={{
				minHeight: "100vh",
				display: "grid",
				placeItems: "center",
				background: "#111",
				color: "#fff",
				fontFamily: "system-ui, sans-serif",
			}}
		>
			<div style={{ textAlign: "center", padding: "2rem" }}>
				<h1>Portfolio</h1>
				<p>Vite development build is configured for this app.</p>
				{endpoint ? (
					<p>
						Live endpoint:{" "}
						<a href={endpoint} target="_blank" rel="noreferrer" style={{ color: "#8cc2ff" }}>
							{endpoint}
						</a>
					</p>
				) : (
					<p>Set NX_PORTFOLIO_ENDPOINT in the monorepo root env file.</p>
				)}
			</div>
		</main>
	);
}
