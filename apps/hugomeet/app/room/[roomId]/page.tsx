import RoomPage from "../../../src/components/RoomPage/RoomPage";

interface RoomRoutePageProps {
params: {
roomId: string;
};
}

export default function RoomRoutePage({ params }: RoomRoutePageProps) {
	return <RoomPage roomId={params.roomId} />;
}
