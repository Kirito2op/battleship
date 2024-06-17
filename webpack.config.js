const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry point
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Your source HTML file
      filename: 'index.html' // Output HTML file name
    })
  ],
  module: {
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/, // Apply Babel loader only to .js files
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env'] // Use @babel/preset-env for modern JavaScript support
              }
          }
      }
    ],
},
  mode: 'development',
  devtool: false,
  // Other configurations like loaders can go here
};
