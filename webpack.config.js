module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/scripts/index.ts',
    output: {
      path: __dirname,
      filename: 'build/bulma-form-validation.js',
      library: 'formValidation',
      libraryTarget: 'var'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    }
  }