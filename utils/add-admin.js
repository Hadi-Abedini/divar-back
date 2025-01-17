const User = require('../models/user-model');
const { asyncHandler } = require('./async-handler');

const addAdmin = asyncHandler(async () => {
	const isAdminExists = await User.findOne({ role: 'ADMIN' });

	if (isAdminExists) {
		return console.info('[i] admin already exists');
	}

	await User.create({
		name: process.env.ADMIN_NAME,
		phone: process.env.ADMIN_PHONE,
		role: 'ADMIN'
	});

	return console.log('[+] admin added');
});

module.exports = { addAdmin };
