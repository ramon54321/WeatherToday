/**
	Import dotenv to load environment variables from .env in the root server folder.
	The log is to see if the hello world appears, meaning the environment variables are loaded correctly.
	This is very useful when the application gets deployed, to see if the variables loaded correctly.
*/
import dotenv from "dotenv"
dotenv.config()

console.log("[INFO] Loading environment variables where ENV_HW = " + process.env.ENV_HW)

/**
	Setting up the database connection
*/
import { Client } from "pg"
const client = new Client({
	connectionString: process.env.DB_URI,
	ssl: true
});

/**
	Private variables
*/

/**
	Connection
*/
(async () => {
	console.log("[INFO][Database] Trying to connect to database")
	await client.connect()
	console.log("[INFO][Database] Successfully connected to database")
})()


/**
	Database interface object
*/
let database = {
	getData: async function () {
		const res = await client.query("SELECT * FROM temperature")
		console.log(res.rows)
	}
}

export default database
