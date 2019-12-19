const path = require("path")
const merge = require("webpack-merge")
const Dotenv = require("dotenv-webpack")
const common = require("./webpack.common.js")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
// .BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  // devtool: false,
  plugins: [
    new HtmlWebPackPlugin({
      // template: path.resolve(__dirname, "public/index.html"),
      template: "./public/index.html",
      // filename: "index.html",
      favicon: "./public/favicon.ico",
      title: "React Typescript Production",
      minify: true,
      hash: true
    }),
    new Dotenv({
      path: "./.env.prod"
    }),
	new MiniCssExtractPlugin({
		  filename: "[contenthash].css"
		  
		}),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 9 },
      threshold: 5240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    }),
    new CompressionPlugin({
      filename: "[path].br[query]",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 5240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    })
    // new BundleAnalyzerPlugin()
  ]
})
