var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
require('coffee-script/register');

var handleError = function (err) {
  console.log(err.name, ' in ', err.plugin, ': ', err.message);
  this.emit('end');
};

gulp.task('test', function () {
  gulp.src([
    'models/*.unit.*',
    'controllers/*.unit.*'
  ])
    .pipe(mocha({
      reporter: 'spec',
      compilers: '--compilers coffee:coffee-script/register'
    }).on('error', handleError));
});

gulp.task('watch', ['test'], function () {
  nodemon({ script: 'server.js', nodeArgs: ['--debug'] })
    .on('change', ['test']);

  gulp.watch(['models/*.unit.*', 'controllers/*.unit.*'], function () {
    gulp.run('test');
  });
});

gulp.task('default', ['test']);
