const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const wp = require("webpack")

const isProduction =
  process.argv.indexOf("-p") >= 0 || process.env.NODE_ENV === "production"

module.exports = {
  context: __dirname,
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[chunkhash].js",
    publicPath: "/"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: [
          isProduction && {
            loader: "babel-loader",
            options: { plugins: ["react-hot-loader/babel"] }
          },
          "ts-loader"
        ].filter(Boolean)
      },
      // css
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            query: {
              modules: {
                localIdentName: isProduction
                  ? "[hash:base64:5]"
                  : "[local]__[hash:base64:5]"
              },
              sourceMap: !isProduction,
              importLoaders: 1
            }
          }
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     ident: "postcss",
          //     plugins: [
          //       require("postcss-import")({ addDependencyTo: wp }),
          //       require("postcss-url")(),
          //       require("postcss-cssnext")(),
          //       require("postcss-reporter")(),
          //       require("postcss-browser-reporter")({
          //         disabled: isProduction
          //       })
          //     ]
          //   }
          // }
        ]
      },
      // static assets
      { test: /\.html$/, use: "html-loader" },
      { test: /\.(png|svg)$/, use: "url-loader?limit=10000" },
      { test: /\.(jpg|gif)$/, use: "file-loader" },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader" // compiles Less to CSS
          }
        ]
      }
    ]
  },
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM"
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new wp.HashedModuleIdsPlugin() // so that file hashes don't change unexpectedly
    // new MiniCssExtractPlugin({
    //   filename: "bundle.css"
    // })
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: "all"
  //   }
  // },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: -10
        }
      }
    },
    runtimeChunk: true
  }
}
