import Style from "./page.module.scss";

export default function BevLaDevBirthdayPage() {
	return (
		<main className={Style.page}>
			<div className={Style.content}>
				<p className={Style.birthday}>🎉 HAPPY 35th BIRTHDAY 🎉</p>
				<h1 className={Style.title}>BEV LA DEV</h1>
				<p className={Style.consoleLine}>
					console.log(&quot;Happy Birthday, Bev! 🎂&quot;);
				</p>
				<p className={Style.compilation}>
					✅ bev-la-dev.exe compiled successfully at age 35
				</p>
				<div className={Style.beat} aria-hidden="true" />
			</div>
		</main>
	);
}
