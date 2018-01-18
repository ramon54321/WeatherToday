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
*/
let database = {
	getData: async function () {
		const res = await client.query("SELECT t2.location, COALESCE(t1.min, 0) as min, COALESCE(t1.max, 0) as max, t2.latest FROM(	WITH results24 AS ( SELECT location as location, min(temperature) as min, max(temperature) as max	FROM temperature WHERE time > now() - interval '24 hours' GROUP BY location	) SELECT location, min, max FROM results24 UNION	SELECT location, latest as min, latest as max FROM (SELECT DISTINCT ON (location) location as location, temperature as latest	FROM temperature ORDER BY location, time DESC) latestTemp WHERE NOT EXISTS (SELECT * FROM results24)) t1 RIGHT OUTER JOIN (SELECT DISTINCT ON (location) location as location, temperature as latest FROM temperature ORDER BY location, time DESC) t2 ON t2.location = t1.location")
		return res.rows
	}
}

export default database
