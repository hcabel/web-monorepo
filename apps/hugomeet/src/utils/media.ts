function catchError(error: Error & { name?: string }) {
	switch (error.name) {
	case "NotFoundError":
		alert("Unable to open your call because no camera and/or microphone were found");
		break;
	case "SecurityError":
	case "PermissionDeniedError":
	case "NotAllowedError":
		break;
	default:
		alert(`Error opening your camera and/or microphone: ${error.message}`);
		break;
	}
}

function combineStream(
	stream1?: MediaStream,
	stream2?: MediaStream
): MediaStream | undefined {
	if (stream1 && stream2) {
		const allTracks = [...stream1.getTracks(), ...stream2.getTracks()];
		return new MediaStream(allTracks.filter((track) => track.readyState === "live"));
	}
	if (!stream1 && !stream2) {
		return undefined;
	}
	return stream1 || stream2;
}

function killTracks(
	tracks?: MediaStreamTrack[],
	stream?: MediaStream
): void {
	if (stream && tracks) {
		tracks.forEach((track) => {
			track.stop();
			stream.removeTrack(track);
		});
	}
}

export default {
	combineStream,
	killTracks,
	catchError,
};
