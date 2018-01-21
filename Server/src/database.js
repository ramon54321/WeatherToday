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
	Connection
*/
(async () => {
	console.log("[INFO][Database] Trying to connect to database")
	await client.connect()
	console.log("[INFO][Database] Successfully connected to database")
})()

/**
	Database interface object
	Documentation contains more information on getData query.
*/
let database = {
	getData: async function () {
		const res = await client.query("SELECT t2.location, COALESCE(t1.min, 0) as min, COALESCE(t1.max, 0) as max, t2.latest FROM (SELECT location as location, min(temperature) as min, max(temperature) as max FROM temperature WHERE time > now() - interval '24 hours'	 GROUP BY location) t1 RIGHT OUTER JOIN (SELECT DISTINCT ON (location) location as location, temperature as latest FROM temperature ORDER BY location, time DESC) t2 ON t2.location = t1.location ORDER BY location")
		return res.rows
	},
	addNew: async function (location, temperature) {
		const res = await client.query({
			name: "addNew",
			text: "INSERT INTO temperature (time, location, temperature) VALUES (now(), $1, $2)",
			values: [location, temperature]
		})
	},
	getRecords: async function (location) {
		const res = await client.query({
			name: "getRecords",
			text: "SELECT time, temperature FROM temperature WHERE location = $1 ORDER BY time DESC LIMIT 10",
			values: [location]
		})
		return res.rows
	}
}

export default database
