export const getFollowingAndFollowers = (ownerId, allUsers) => {
	let following = [];
	let followers = [];

	allUsers.forEach((user) => {
		if (user.followers.includes(ownerId)) {
			following.push(user._id);
		}
		if (user.following.includes(ownerId)) {
			followers.push(user._id);
		}
	});

	return { following, followers };
};
