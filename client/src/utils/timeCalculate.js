export const calculateTimeSpent = (createdAt) => {
	// Parse the createdAt string to a Date object

	const createdAtDate = new Date(createdAt);
	const now = new Date();

	// Calculate the time difference in milliseconds
	let timeDifference = now - createdAtDate;

	// Calculate time units
	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) {
		return `${days} days`;
	} else if (hours > 0) {
		return `${hours} hour`;
	} else if (minutes > 0) {
		return `${minutes} minutes`;
	} else {
		return `${seconds} seconds`;
	}
};
