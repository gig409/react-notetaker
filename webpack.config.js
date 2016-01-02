var path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    main: [
      './app/App.js'
    ]
  },
  output: {
    path: path.resolve('public/'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'public'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js','.jsx']
  }
}