import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import DotEnv from "dotenv-webpack";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.js",
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
    publicPath: "/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new DotEnv(),
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
      },
    ],
  },
};
