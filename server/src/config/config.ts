import 'dotenv/config';

export default {
	serverUrl: process.env.SERVER_URL,
	port: Number(process.env.PORT),
	databaseURL: process.env.DATABASE_URL,
};