const path = require('path');
const dotenv = require('dotenv');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'react-autocomplete.js',
    path: path.resolve(__dirname, 'dist/webpack'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isProduction,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: { path: path.resolve(__dirname, 'postcss.config.js') },
              plugins: () => [
                // eslint-disable-next-line global-require
                require('postcss-import'),
                // eslint-disable-next-line global-require
                require('postcss-cssnext')({
                  // If you don't set this, you get the GB preset default,
                  // which is fine in most cases
                  browsers: ['> 1%', 'last 2 versions'],
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'react-autocomplete.css',
    }),
  ],
  optimization: {
    ...isProduction && {
      minimizer: [
        new TerserPlugin(),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
  },
  devtool: isProduction ? 'cheap-source-map' : false,
  performance: {
    maxAssetSize: 200000, // in bytes
    hints: false,
  },
};
