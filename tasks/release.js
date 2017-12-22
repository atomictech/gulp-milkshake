import gulp from 'gulp';
import zip from 'gulp-zip';
import fs from 'fs';

import { clean } from './clean';
import { prepareRelease } from './prepare-release';

import args from '../args';
import { appIterator } from '../apps';

const zipFunc = appIterator("zip", (app, resolve, reject) => {
  if (args.zip) {
    const pjson = JSON.parse(fs.readFileSync(app.path.appFolder + '/package.json'));

    gulp.src(app.path.appExport + '/**/*')
      .pipe(zip(pjson.name + '-' + pjson.version + '.zip'))
      .pipe(gulp.dest(app.path.appRelease))
      .on('end', () => {
        resolve();
      });
  } else {
    resolve();
  }
});

gulp.task('zip', zipFunc);

gulp.task('release', gulp.series(
  clean,
  prepareRelease,
  zipFunc
));
