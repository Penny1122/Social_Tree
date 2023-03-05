const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //development
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[hash].js",
    publicPath: "/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    allowedHosts: ["all"],
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /.(png|jpg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./index.html",
      inject: true,
      favicon: path.resolve("src/images/tree.ico"),
    }),
    new MiniCssExtractPlugin({
      filename: "main.[hash].css",
    }),
  ],
};
