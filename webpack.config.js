const path = require("path");
const PROXY_SERVER = require('./API_SERVER.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",

  entry: {
    index: "./src/main.js",
    video: "./src/video.js"
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].min.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },

  devServer: {
    port: 9000,
    open: true,
    hot: true,
    proxy: { "/api": PROXY_SERVER },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "video.html",
      chunks: ["video"],
    }),
  ],
};

