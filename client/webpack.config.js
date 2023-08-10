const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return {
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
                new HtmlWebpackPlugin({
                  template: "./dist/index.html",
                  minify: false,
                  inject: false
                }),
              new webpack.HotModuleReplacementPlugin()
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
