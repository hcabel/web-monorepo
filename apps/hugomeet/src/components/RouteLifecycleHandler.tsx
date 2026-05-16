"use client";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Utils from "../utils/utils";

export default function RouteLifecycleHandler() {
	const location = useLocation();

	useEffect(() => {
		if (!location.pathname.startsWith("/room/")) {
			if (window.SignalingSocket) {
				window.SignalingSocket.onopen = undefined;
				window.SignalingSocket.onmessage = undefined;
				window.SignalingSocket.onerror = undefined;
				window.SignalingSocket.onclose = undefined;
				if (
					window.SignalingSocket.readyState === WebSocket.CONNECTING ||
					window.SignalingSocket.readyState === WebSocket.OPEN
				) {
					window.SignalingSocket.close();
				}
				window.SignalingSocket = null;
			}

			Utils.media.killTracks(
				window.localStream?.getTracks(),
				window.localStream
			);
		}
	}, [location.pathname]);

	return null;
}
