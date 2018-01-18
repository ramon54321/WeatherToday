"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _pg = require("pg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config(); /**
                           	Import dotenv to load environment variables from .env in the root server folder.
                           	The log is to see if the hello world appears, meaning the environment variables are loaded correctly.
                           	This is very useful when the application gets deployed, to see if the variables loaded correctly.
                           */


console.log("[INFO] Loading environment variables where ENV_HW = " + process.env.ENV_HW);

/**
	Setting up the database connection
*/

const client = new _pg.Client({
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
	console.log("[INFO][Database] Trying to connect to database");
	await client.connect();
	console.log("[INFO][Database] Successfully connected to database");

	const res = await client.query("SELECT * FROM temperature");
	console.log(res.rows);
})();

/**
	Database interface object
*/
let database = function () {
	console.log("inside thing");
};

exports.default = database;