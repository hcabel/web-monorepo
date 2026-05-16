import { Navigate, Route, Routes, useParams } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import Providers from "./components/Providers";
import RoomPage from "./components/RoomPage/RoomPage";
import RouteLifecycleHandler from "./components/RouteLifecycleHandler";

function RoomPageRoute() {
	const params = useParams<{ roomId: string }>();
	if (!params.roomId) {
		return <Navigate to="/" replace />;
	}
	return <RoomPage roomId={params.roomId} />;
}

export default function App() {
	return (
		<Providers>
			<RouteLifecycleHandler />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/room/:roomId" element={<RoomPageRoute />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Providers>
	);
}
