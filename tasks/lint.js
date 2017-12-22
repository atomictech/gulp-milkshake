import gulp from 'gulp';
import eslint from 'gulp-eslint';

import args from '../args';
import { appIterator } from '../apps';

const lint = appIterator("lint", (app, resolve, reject) => {
  gulp.src(app.path.appSource)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .on('end', resolve);
  return resolve();
});

export { lint };

gulp.task('lint', lint);
