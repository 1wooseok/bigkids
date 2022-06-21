const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "[name]_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        use: ["file-loader"],
      },
    ],
  },
  devServer: {
    port: 9000,
    open: true,
    hot: true,
    proxy: { "/api": "http://toch.kr:8000" },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: "index.html",
      chunks: ["index"],
    }),
  ],
};