"use client";

interface NotificationHugoMeetProps {
index: number;
name: string;
clientId: string;
onResponce: (approved: boolean, id: string) => void;
}

export default function NotificationHugoMeet(props: NotificationHugoMeetProps) {
	function formatName(value: string) {
		if (value.length > 23) {
			return `${value.slice(0, 20)}...`;
		}
		return value.slice(0, 23);
	}

	return (
		<div key={props.index} className="RL-Invitation" style={{ top: `${40 * props.index}px` }}>
			<div className="RL-I-Content">
				<span className="RL-I-C-Name">{formatName(props.name)}</span>
wants to join the room
			</div>
			<div className="RL-I-Buttons">
				<div className="RL-I-B-Allow" onClick={() => props.onResponce(true, props.clientId)}>
allow
				</div>
				<div className="RL-I-B-Denied" onClick={() => props.onResponce(false, props.clientId)}>
deny
				</div>
			</div>
		</div>
	);
}
