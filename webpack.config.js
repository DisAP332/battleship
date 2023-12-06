const path = require("path");

module.exports = {
  mode: "production",
  devServer: {
    static: "./dist",
  },
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
};
