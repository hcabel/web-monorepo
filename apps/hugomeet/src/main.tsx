import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./components/Header/HeaderCSS.css";
import "./components/LandingPage/landingPageCSS.css";
import "./components/RoomPage/roomPageCSS.css";
import "./components/RoomPage/layers/preRoom/preRoomLayerCSS.css";
import "./components/RoomPage/layers/roomLayer/roomLayerCSS.css";
import "./components/RoomPage/layers/roomLayer/components/peerVideo/peerVideoCSS.css";
import "./components/RoomPage/layers/roomLayer/components/notification/notificationHugoMeetCSS.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
