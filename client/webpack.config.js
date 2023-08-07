const path = require('path');

module.exports = {
  entry: {
    client: "./src/client.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist')
  },
  mode: "development",
  node: false,
  watch: true,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // ensure compatibility with older browsers
            plugins: ["@babel/plugin-transform-object-assign"], // ensure compatibility with IE 11
          },
        },
      },
      {
        test: /\.js$/,
        loader: "webpack-remove-debug", // remove "debug" package
      },
    ],
  },
};
