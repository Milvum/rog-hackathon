import * as path from 'path';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as HTMLWebpackPlugin from 'html-webpack-plugin';
import * as MiniCSSExtractPlugin from 'mini-css-extract-plugin';

export default {
  entry: {
    main: path.join(__dirname, 'src', 'main', 'index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true,
        },
      },
      {
        test: /\.s?css$/,
        use: [
          'webpack-extract-css-hot-reload',
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin(['build']),
    new HTMLWebpackPlugin({
      title: 'BRG2',
      description: '',
      template: 'index.html',
      inject: false,
      favicon: './assets/favicon.png',
    }),
  ],
};
