//const globEntries = require("webpack-glob-entries");
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: "main.js",
	output: {
		filename: "../Static/bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js/,
				include: /src/,
				loader: "babel-loader"
			}
		]
	},
	plugins: [
/*
		new UglifyJsPlugin({
			test: /\.js/,
			parallel: 4,
			sourceMap: true
		})
*/
	]
};
