import { type ReactNode } from "react";

import "../src/components/Header/HeaderCSS.css";
import "../src/components/LandingPage/landingPageCSS.css";
import "../src/components/RoomPage/roomPageCSS.css";
import "../src/components/RoomPage/layers/preRoom/preRoomLayerCSS.css";
import "../src/components/RoomPage/layers/roomLayer/roomLayerCSS.css";
import "../src/components/RoomPage/layers/roomLayer/components/peerVideo/peerVideoCSS.css";
import "../src/components/RoomPage/layers/roomLayer/components/notification/notificationHugoMeetCSS.css";

import Providers from "../src/components/Providers";
import RouteLifecycleHandler from "../src/components/RouteLifecycleHandler";

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<RouteLifecycleHandler />
					{children}
				</Providers>
			</body>
		</html>
	);
}
