import "../global.scss";

interface HiddenBirthdayLayoutProps {
	children: React.ReactNode;
}

export default function HiddenBirthdayLayout({
	children,
}: HiddenBirthdayLayoutProps) {
	return (
		<html lang="en">
			<body className="root">{children}</body>
		</html>
	);
}
