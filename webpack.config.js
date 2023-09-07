const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	resolve: {
		extensions: ['.js'],
	},
	devServer: {
		static: './dist',
		open: true,
		historyApiFallback: true,
	},
	output: {
		publicPath: '/',
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new DotEnv(),
		new CopyPlugin({
			patterns: [
				{ from: 'templates', to: 'templates' }, // 'from'은 복사할 디렉토리, 'to'는 복사될 위치입니다.
			],
		}),
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
				include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'templates')], // src와 templates 디렉토리 모두 포함
			},
		],
	},
};
