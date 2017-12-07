var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./library/bowman.js",
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};