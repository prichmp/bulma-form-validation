

var gulp = require('gulp');
var shell = require('gulp-shell');
var gulpMultiProcess = require('gulp-multi-process');

gulp.task('default', function(){
  gulpMultiProcess(['copy', 'pack', 'serve']);
});

var opts = {
  env: {
    FORCE_COLOR: true
  },
  verbose: true
};

gulp.task('copy', function(){
  gulp.watch(['./src/index.html'], function(){
    gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'));
  })
});

gulp.task('pack', shell.task(['npm run-script pack'], opts));
gulp.task('serve', shell.task(['npm run-script serve'], opts));

