import type { RTCMessageType } from "../types/hugomeet";

function isRTCMessage(msgType: string): msgType is RTCMessageType {
	return msgType === "Offer" || msgType === "Answer" || msgType === "IceCandidate";
}

export default {
	isRTCMessage,
};
