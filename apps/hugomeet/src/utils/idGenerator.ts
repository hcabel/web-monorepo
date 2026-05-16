function generateRoomID(length: number): string {
	let result = "";
	const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

	for (let index = 0; index < length; index++) {
		if (index !== 0 && index % 3 === 0 && index + 1 < length) {
			result += "-";
		}
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

function isRoomIDValid(roomId: string): boolean {
	const format = new RegExp("^[a-z0-9]{3}-[a-z0-9]{3}-[a-z0-9]{3}$");

	return format.test(roomId);
}

export default {
	generateRoomID,
	isRoomIDValid,
};
