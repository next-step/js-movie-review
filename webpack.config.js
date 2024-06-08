const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
  entry: [
    "./src/index.js",
    "./templates/styles/reset.css",
    "./templates/styles/common.css",
  ],
  mode: "development",
  resolve: {
    extensions: [".js"],
  },
  devServer: {
    static: "./dist",
    open: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: "./",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new DotEnv({
      path: path.join(__dirname, `/.env`),
      safe: false,
      systemvars: true, //Set to true if you would rather load all system variables as well (useful for CI purposes)
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "assets"),
          path.resolve(__dirname, "templates"),
        ],
      },
    ],
  },
};
