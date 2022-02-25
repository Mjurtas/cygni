const path = require("path");
const common = require("./webpack.common");
const ESLintPlugin = require("eslint-webpack-plugin");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name].[ext]",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  }, 
  plugins: [new ESLintPlugin()],
  devServer: {
    open: true,
    port: 8080,
  },
});
