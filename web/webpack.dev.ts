import * as merge from 'webpack-merge';
import * as CircularDependencyPlugin from 'circular-dependency-plugin';

import common from './webpack.common';

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          typeCheck: true,
          emitErrors: false,
        },
      },
    ],
  },
  plugins: [
    new CircularDependencyPlugin({
      // Exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // Add errors to webpack instead of warnings
      failOnError: false,
    }),
  ],
});
