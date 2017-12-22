import fs from 'fs';
import gulp from 'gulp';
import bump from 'gulp-bump';
import conventionalChangelog from 'gulp-conventional-changelog';

import { exportTask } from './export';
import { lint } from './lint';

import args from '../args';
import { appIterator } from '../apps';

const bumpVersion = appIterator("bump", (app, resolve, reject) => {
  gulp.src(app.path.appFolder + '/package.json')
    .pipe(bump({ type: args.bump })) //major|minor|patch|prerelease
    .pipe(gulp.dest(app.path.appFolder))
    .on('end', () => {
      resolve();
    });    
});

const changelogFunc = appIterator("changelog", (app, resolve, reject) => {
  const pjson = JSON.parse(fs.readFileSync(app.path.appFolder + '/package.json'));

  gulp.src(app.path.appFolder + '/CHANGELOG.md')
  .pipe(conventionalChangelog({
    repository: pjson.repository.url,
    version: pjson.version,
    preset: 'angular'
  }, {
    // context goes here
  }, {
    // git-raw-commits options go here
  }, {
    // conventional-commits-parser options go here
  }, {
    // conventional-changelog-writer options go here
  }))
  .pipe(gulp.dest(app.path.appFolder));

  return resolve();
});

const prepareRelease = gulp.series(
  lint,
  // bumpVersion,
  exportTask,
  changelogFunc);
export { prepareRelease };

gulp.task('prepare-release', prepareRelease);
