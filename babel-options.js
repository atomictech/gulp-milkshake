var path = require('path');

module.exports = function(modules) {
  return {
    filename: '',
    filenameRelative: '',
    sourceMap: true,
    sourceRoot: '',
    moduleRoot: path.resolve('src').replace(/\\/g, '/'),
    moduleIds: false,
    comments: false,
    compact: false,
    code: true,
    presets: [ ['es2015', { loose: true, modules: modules }], 'stage-1'],
    plugins: [
      'syntax-flow',
      'transform-decorators-legacy',
      'transform-flow-strip-types'
    ]
  };
};
