export type RTCMessageType = "Offer" | "Answer" | "IceCandidate";

export interface Peer {
_id: string;
name: string;
audio?: boolean;
video?: boolean;
}

export interface ConnectionCallbackMessage {
type: "ConnectionCallback";
selfId: string;
instantJoin: boolean;
peerConnectionOptions: RTCConfiguration;
}

export interface JoinRequestCallbackMessage {
type: "JoinRequestCallback";
}

export interface RoomSetupCallbackMessage {
type: "RoomSetupCallback";
peers: Peer[];
}

export interface RTCSignalMessage {
type: RTCMessageType;
from: string;
to?: string;
offer?: RTCSessionDescriptionInit;
answer?: RTCSessionDescriptionInit;
iceCandidate?: RTCIceCandidateInit;
}

export interface PeerConnectionEntry {
_id: string;
PC: RTCPeerConnection;
DC: RTCDataChannel | null;
stream?: MediaStream;
}

export interface Invitation {
_id: string;
name: string;
}
