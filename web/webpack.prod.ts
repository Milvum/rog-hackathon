import { DefinePlugin, optimize } from 'webpack';
import * as merge from 'webpack-merge';

import common from './webpack.common';

export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new optimize.UglifyJsPlugin({ sourceMap: true }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
