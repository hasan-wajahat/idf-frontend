const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';
const distDir = path.join(__dirname, 'dist');

const defaultConfig = {
  mode: process.env.NODE_ENV || 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'widget.css',
    }),
    devMode ? null : new JavaScriptObfuscator(),
  ].filter(i => i),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};

module.exports = [{
  ...defaultConfig,
  entry: './src/index.js',
  output: {
    path: distDir,
    publicPath: '/',
    filename: 'widget.js',
    library: 'IdfWidget',
    libraryExport: 'default',
    libraryTarget: 'window',
  },
}];
