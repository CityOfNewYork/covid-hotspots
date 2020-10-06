require('dotenv').config()
const buildEnv = require('nyc-build-helper/build')
const build = buildEnv.getEnv(__dirname)

const replaceOptions = [{
  dir: 'dist',
  files: ['311.html'],
  rules: [{
    search: /%ver%/g,
    replace: build.projVer
  }]
}]
if (!build.isStg && !build.isPrd && process.env.REFRESH_MINS) {
  replaceOptions.push({
    dir: 'dist/js',
    files: ['cooling-center.js'],
    rules: [{
      search: /REFRESH_MINS\: 5/,
      replace: 'REFRESH_MINS: ' + process.env.REFRESH_MINS
    }]
  })
  replaceOptions.push({
    dir: 'dist',
    files: ['inactive.html'],
    rules: [{
      search: /REFRESH_MINS = 5/,
      replace: 'REFRESH_MINS = ' + process.env.REFRESH_MINS
    }]
  })
}

module.exports = require('nyc-build-helper').config.defaultWebpackConfig(
  __dirname,
  {
      copyOptions: [
        'src/inactive.html', 
        'src/311.html', 
        {from: 'src/css/311.css', to: 'css'}
      ],
      replaceOptions
  }
)