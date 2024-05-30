const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  resolve: {
    extensions: ['.js'],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist/js-movie-review'),
    open: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: '/js-movie-review/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new DotEnv(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
