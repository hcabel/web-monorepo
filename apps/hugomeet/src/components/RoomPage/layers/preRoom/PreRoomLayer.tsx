"use client";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

import config from "../../../../config";
import Header from "../../../Header/Header";
import type {
	ConnectionCallbackMessage,
	JoinRequestCallbackMessage,
} from "../../../../types/hugomeet";

interface PreRoomLayerProps {
	roomId: string;
	audio: boolean;
	video: boolean;
	onJoin: () => void;
onConnectionCallback: (msg: ConnectionCallbackMessage) => void;
onChangeAudioStatus: (audio: boolean) => Promise<MediaStream | undefined>;
onChangeVideoStatus: (video: boolean) => Promise<MediaStream | undefined>;
}

type PreRoomState = "Connecting" | "Form" | "Pending" | "Rejected" | "Connection Error";

export default function PreRoomLayer(props: PreRoomLayerProps) {
	const [cookie, setCookie] = useCookies(["userName"]);
	const [name, setName] = useState<string>(
		!cookie.userName || cookie.userName === "undefined" ? "" : cookie.userName
	);
	const [state, setState] = useState<PreRoomState>("Form");

	const navigate = useNavigate();
	const location = useLocation();

	function WSonMessage(msg: MessageEvent<string>) {
		let parsedMessage: ConnectionCallbackMessage | JoinRequestCallbackMessage | { type: string };
		try {
			parsedMessage = JSON.parse(msg.data) as ConnectionCallbackMessage | JoinRequestCallbackMessage;
		} catch (error) {
			console.error(`Cannot parse message: ${msg.data}\nError: ${error}`);
			return;
		}
		console.log(parsedMessage);

		if (parsedMessage.type === "ConnectionCallback") {
			const connectionMessage = parsedMessage as ConnectionCallbackMessage;
			props.onConnectionCallback(connectionMessage);
			if (connectionMessage.instantJoin === true) {
				props.onJoin();
			} else {
				setState("Pending");
			}
		} else if (parsedMessage.type === "JoinRequestCallback") {
			props.onJoin();
		} else {
			console.warn(`Msg dropped because type ${parsedMessage.type} is unknown`);
		}
	}

	function WSonClose(event: CloseEvent) {
		if (event.code === 4005) {
			console.log(`The owner of the room ${props.roomId} denied your joining request`);
			setState("Rejected");
		} else if (event.code === 1006) {
			setState("Connection Error");
		} else {
			console.log(`WS close: ${event.code}${event.reason && ` - ${event.reason}`}`);
			if (location.pathname !== "/") {
				navigate("/");
			}
		}
	}

	function WSonError(event: Event) {
		console.log("WS error:", event);
		window.SignalingSocket?.close();
	}

	function connectClient(roomIdToConnectTo: string) {
		if (!window.WebSocket) {
			alert("FAILED: Your browser's version is too old.");
			return;
		}
		if (!config.url_signaling) {
			alert("FAILED: Signaling server endpoint is not configured.");
			setState("Connection Error");
			return;
		}

		window.SignalingSocket = new window.WebSocket(
			`${config.url_signaling}?roomid=${roomIdToConnectTo}&name=${name}`
		);

		window.SignalingSocket.onmessage = WSonMessage;
		window.SignalingSocket.onclose = WSonClose;
		window.SignalingSocket.onerror = WSonError;
	}

	function participate() {
		setCookie("userName", name, { path: "/" });
		if (!window.SignalingSocket || window.SignalingSocket.readyState === WebSocket.CLOSED) {
			connectClient(props.roomId);
		}
		setState("Connecting");
	}

	function toggleAudio() {
		props.onChangeAudioStatus(!props.audio).catch(() => undefined);
	}

	function toggleVideo() {
		props.onChangeVideoStatus(!props.video).catch(() => undefined);
	}

	useEffect(() => {
		if (window.Notification) {
			Notification.requestPermission().catch(() => Notification.requestPermission());
		}
	}, []);

	return (
		<div className="PreRoomPage">
			<Header />
			<div className="PRP-Body">
				<div className="PRP-B-Content">
					<div className="PRP-B-C-Stream">
						<div className="PRP-B-C-S-VideoShadow">
							<div className="PRP-B-C-S-VS-Video">
								<div className="PRP-B-C-S-VS-V-Inside">
									<div className="PRP-B-C-S-VS-V-I-StreamsVideo">
										<video
											id="LocalStream"
											className="PRP-B-C-S-VS-V-I-SV-Video"
											autoPlay
											muted
											playsInline
											loop
										/>
									</div>
								</div>
								<div className="PRP-B-C-S-VS-V-Buttons">
									<div
										className={`PRP-B-C-S-VS-V-B-AudioButton${props.audio ? "On" : "Off"}`}
										onClick={toggleAudio}
									>
										{props.audio ? (
											<svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
												<path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"></path>
												<path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
											</svg>
										) : (
											<svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
												<path d="M11 5c0-.55.45-1 1-1s1 .45 1 1v5.17l1.82 1.82c.11-.31.18-.64.18-.99V5c0-1.66-1.34-3-3-3S9 3.34 9 5v1.17l2 2V5zM2.81 2.81L1.39 4.22l11.65 11.65c-.33.08-.68.13-1.04.13-2.76 0-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c.57-.08 1.12-.24 1.64-.46l5.14 5.14 1.41-1.41L2.81 2.81zM19 11h-2c0 .91-.26 1.75-.69 2.48l1.46 1.46A6.921 6.921 0 0 0 19 11z"></path>
											</svg>
										)}
									</div>
									<div
										className={`PRP-B-C-S-VS-V-B-VideoButton${props.video ? "On" : "Off"}`}
										onClick={toggleVideo}
									>
										{props.video ? (
											<svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
												<path d="M18 10.48V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.48l4 3.98v-11l-4 3.98zm-2-.79V18H4V6h12v3.69z"></path>
											</svg>
										) : (
											<svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
												<path d="M18 10.48V6c0-1.1-.9-2-2-2H6.83l2 2H16v7.17l2 2v-1.65l4 3.98v-11l-4 3.98zM16 16L6 6 4 4 2.81 2.81 1.39 4.22l.85.85C2.09 5.35 2 5.66 2 6v12c0 1.1.9 2 2 2h12c.34 0 .65-.09.93-.24l2.85 2.85 1.41-1.41L18 18l-2-2zM4 18V6.83L15.17 18H4z"></path>
											</svg>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
					{(() => {
						switch (state) {
						case "Connecting":
							return (
								<div className="PRP-B-C-Connecting">
									<div className="PRP-B-C-C-Title">Connecting...</div>
									<div className="PRP-B-C-C-LoadingAnimation">
										<div></div>
										<div></div>
										<div></div>
										<div></div>
									</div>
								</div>
							);
						case "Form":
							return (
								<div className="PRP-B-C-Form">
									<div className="PRP-B-C-F-Title">Ready to join?</div>
									<input
										className="PRP-B-C-F-Name"
										name="Name"
										placeholder="Name"
										value={name}
										onChange={(e) =>
											setName(e.target.value.length >= 30 ? name : e.target.value)
										}
									/>
									<div className="PRP-B-C-F-SubmitButtons" onClick={participate}>
										<div className="PRP-B-C-F-SB-Participate">
											<span className="PRP-B-C-F-SB-P-Value">Join</span>
										</div>
									</div>
								</div>
							);
						case "Pending":
							return (
								<div className="PRP-B-C-Form">
									<div className="PRP-B-C-F-Title">Waiting for approval...</div>
									<div className="PRP-B-C-C-LoadingAnimation">
										<div></div>
										<div></div>
										<div></div>
										<div></div>
									</div>
								</div>
							);
						default:
							return (
								<div className="PRP-B-C-Form">
									<div className="PRP-B-C-F-Title" style={{ color: "red" }}>
										{state}
									</div>
									<div className="PRP-B-C-F-SubmitButtons" onClick={participate}>
										<div className="PRP-B-C-F-SB-Participate">
											<span className="PRP-B-C-F-SB-P-Value">retry</span>
										</div>
									</div>
								</div>
							);
						}
					})()}
				</div>
			</div>
		</div>
	);
}
