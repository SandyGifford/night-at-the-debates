import path from "path";
import { Configuration } from "webpack";

const tsconfig = require("./tsconfig");

const tsPaths = tsconfig.compilerOptions.paths;
const tsPathKeys = Object.keys(tsPaths)

const aliases = tsPathKeys.reduce((aliases, tsPathKey) => {
	const tsPath = tsPaths[tsPathKey];
	const aliasKey = tsPathKey.replace(/\/\*$/, "");
	aliases[aliasKey] = path.resolve(__dirname, tsPath[0].replace(/\/\*$/, ""));
	return aliases;
}, {} as { [key: string]: string });

const isDev = process.env.NODE_ENV === "development";

const config: Configuration = {
	mode: isDev ? "development" : "production",
	entry: {
		index: "./src/prod/client/prod.tsx",
		dev: "./src/dev/client/dev.tsx"
	},
	output: {
		path: path.resolve(__dirname, "dist/build"),
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ["ts-loader"]
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
		]
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".css"],
		alias: aliases,
	},
	devtool: "source-map",
};

export default config;
