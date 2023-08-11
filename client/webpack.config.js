const path = require("path");
//const dotenv = require("dotenv")
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//dotenv.config({ path: path.resolve(__dirname, './.env') })
//const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return {
//      target: "node",
      mode,
      entry: "./src/index.js",
      devServer: {
                hot: true,
                open: true
            },
            output: {
                publicPath: "/",
                path: path.resolve(__dirname, "dist"),
                filename: "index.js"
            },
            plugins: [
//             new webpack.DefinePlugin({
//      process: {env: {}}
//  }),
//              new webpack.EnvironmentPlugin(['REACT_APP_API_URL']),
                new HtmlWebpackPlugin({
                  template: "./dist/index.html",
                  minify: false,
                  inject: false
                }),
              new webpack.HotModuleReplacementPlugin(),
//                      new NodePolyfillPlugin()
            ],
      module: {
      rules: [
         {
           test: /\.(js|jsx)$/,
           exclude: /node_modules/,
           use: {
             loader: "babel-loader",
             options: {
               presets: ["@babel/preset-env", "@babel/preset-react"], // ensure compatibility with older browsers
               plugins: ["@babel/plugin-transform-object-assign"], // ensure compatibility with IE 11
             },
           },
         },
         {
           test: /\.(js|jsx)$/,
           exclude: /node_modules/,
           loader: "webpack-remove-debug", // remove "debug" package
         },
       ],
  }
        }
};
