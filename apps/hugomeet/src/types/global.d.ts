export {};

declare global {
	interface Window {
		SignalingSocket: WebSocket | null;
		localStream?: MediaStream;
		clockTimeout?: ReturnType<typeof setTimeout>;
		clockInterval?: ReturnType<typeof setInterval>;
	}
}
