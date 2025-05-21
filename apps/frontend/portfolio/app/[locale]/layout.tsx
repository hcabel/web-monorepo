// design
import "../global.scss";

// Components
import LocaleSelector from "Components/LocaleSelector/LocaleSelector";

// Hooks
import { LocaleProvider, Locales } from "./LocaleContext";

export interface LocaleLayoutParams {
	locale: Locales;
}

export interface ILocaleLayoutProps {
	children: React.ReactNode;
	params: LocaleLayoutParams;
}

export default function LocaleLayout(props: ILocaleLayoutProps) {
	return (
		<html lang={props.params.locale}>
			<body className="root" style={{ background: "grey" }}>
				{/* Allow to access the local from every where easily */}
				<LocaleProvider value={props.params.locale}>
					<LocaleSelector />
					{props.children}
				</LocaleProvider>
			</body>
		</html>
	);
}
