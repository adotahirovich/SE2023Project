const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: path.join(dirname, "./src/index.js"),
  output: {
    path: path.join(dirname, "/dist"),
    filename: "main.js",
    publicPath: "/dist/",
  },
  externals: [nodeExternals()],
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};
