"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import PreRoomLayer from "./layers/preRoom/PreRoomLayer";
import RoomLayer from "./layers/roomLayer/RoomLayer";

import Utils from "../../utils/utils";
import type { ConnectionCallbackMessage } from "../../types/hugomeet";

interface RoomPageProps {
	roomId: string;
}

export default function RoomPage({ roomId }: RoomPageProps) {
	const [audio, setAudio] = useState(true);
	const [video, setVideo] = useState(true);
	const [hasJoin, setHasJoin] = useState(false);
	const [selfId, setSelfId] = useState("");
	const [rtcOptions, setRtcOptions] = useState<RTCConfiguration>({});

	const router = useRouter();

	function onConnectionCallback(msg: ConnectionCallbackMessage) {
		setSelfId(msg.selfId);
		setRtcOptions({ ...msg.peerConnectionOptions });
	}

	async function initStreams(
		audioConstraint: boolean,
		videoConstraint: boolean
	): Promise<MediaStream | undefined> {
		if (audioConstraint === false && videoConstraint === false) {
			Utils.media.killTracks(window.localStream?.getTracks(), window.localStream);
			return undefined;
		}

		if (!navigator.mediaDevices) {
			alert("This site is untrusted we cant access to the camera/or and microphone !");
			router.push("/");
			return undefined;
		}

		let streamResult = window.localStream || new MediaStream();
		if (audioConstraint) {
			await navigator.mediaDevices
				.getUserMedia({ audio: true })
				.then((newAudioStream) => {
					const localVideo = document.getElementById("LocalStream") as HTMLVideoElement | null;
					if (localVideo) {
						streamResult = Utils.media.combineStream(streamResult, newAudioStream) as MediaStream;
						localVideo.srcObject = streamResult;
					} else {
						Utils.media.killTracks(newAudioStream.getTracks(), newAudioStream);
					}
				})
				.catch((error: Error) => {
					setAudio(false);
					Utils.media.catchError(error);
				});
		}
		if (videoConstraint) {
			await navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((newVideoStream) => {
					const localVideo = document.getElementById("LocalStream") as HTMLVideoElement | null;
					if (localVideo) {
						streamResult = Utils.media.combineStream(streamResult, newVideoStream) as MediaStream;
						localVideo.srcObject = streamResult;
					} else {
						Utils.media.killTracks(newVideoStream.getTracks(), newVideoStream);
					}
				})
				.catch((error: Error) => {
					setVideo(false);
					Utils.media.catchError(error);
				});
		}
		window.localStream = streamResult;
		return streamResult;
	}

	async function onChangeAudioStatus(nextAudio: boolean): Promise<MediaStream | undefined> {
		setAudio(nextAudio);

		const audioTracks = window.localStream?.getAudioTracks();
		if (audioTracks && audioTracks.length > 0) {
			audioTracks.forEach((track) => {
				track.enabled = nextAudio;
			});
			return undefined;
		}
		return initStreams(true, false);
	}

	async function onChangeVideoStatus(nextVideo: boolean): Promise<MediaStream | undefined> {
		setVideo(nextVideo);

		if (nextVideo === false) {
			Utils.media.killTracks(window.localStream?.getVideoTracks(), window.localStream);
			return undefined;
		}
		return initStreams(false, true);
	}

	useEffect(() => {
		if (!Utils.idGenerator.isRoomIDValid(roomId)) {
			router.push("/");
		}
	}, [roomId, router]);

	useEffect(() => {
		if (window.clockTimeout !== undefined) {
			clearTimeout(window.clockTimeout);
			window.clockTimeout = undefined;
		}
		if (window.clockInterval !== undefined) {
			clearInterval(window.clockInterval);
			window.clockInterval = undefined;
		}

		if (Utils.idGenerator.isRoomIDValid(roomId)) {
			initStreams(audio, video).catch(() => undefined);
		}
	}, []);

	return (
		<div className="RoomPage">
			{hasJoin === false ? (
				<PreRoomLayer
					roomId={roomId}
					onChangeAudioStatus={onChangeAudioStatus}
					onChangeVideoStatus={onChangeVideoStatus}
					onJoin={() => setHasJoin(true)}
					onConnectionCallback={onConnectionCallback}
					audio={audio}
					video={video}
				/>
			) : (
				<RoomLayer
					roomId={roomId}
					onChangeAudioStatus={onChangeAudioStatus}
					onChangeVideoStatus={onChangeVideoStatus}
					audio={audio}
					video={video}
					selfId={selfId}
					rtcOptions={rtcOptions}
				/>
			)}
		</div>
	);
}
