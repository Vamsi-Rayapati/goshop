const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  externals: ['pg-hstore'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
            configFile: 'tsconfig.json'
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // fallback: { 
    //     'path': require.resolve('path-browserify'),
    //     "url": require.resolve("url/"),
    //     "assert": require.resolve("assert/"),
    //     "pg-hstore"
    //     "fs": false
    // },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
