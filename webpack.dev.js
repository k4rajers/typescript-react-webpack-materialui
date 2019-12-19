const path = require("path")
const common = require("./webpack.common.js")
const merge = require("webpack-merge")
const wp = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")
var DashboardPlugin = require("webpack-dashboard/plugin")

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].bundle.js",
    chunkFilename: "[name].[hash].bundle.js",
    publicPath: "/"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: "0.0.0.0",
    port: 3000,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    watchContentBase: true,
    watchOptions: {
      poll: 2000 // in milliseconds
    }
  },
  plugins: [
    new wp.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      // template: path.resolve(__dirname, "public/index.html"),
      template: "./public/index.html",
      // filename: "index.html",
      favicon: "./public/favicon.ico",
      title: "React Typescript Development",
      minify: true,
      hash: true
    }),
    new Dotenv({
      path: "./.env.dev"
    }),
    new DashboardPlugin()
  ]
})
