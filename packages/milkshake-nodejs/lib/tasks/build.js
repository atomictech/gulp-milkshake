import gulp from 'gulp';

import plugin from '../milkshake-nodejs';

plugin.task('buildAll', (tag, app, id, done) => {
  return gulp.src(app.path.appSource)
    .pipe(sourcemaps.init())
    // transpiling because import module loading has not yet good support in node 8,9...
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(app.path.appBuild));
});

plugin.task('build', plugin.series('cleanDist', 'buildAll'));
