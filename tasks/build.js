import gulp from 'gulp';
import to5 from 'gulp-babel';
import { exec } from 'child_process';
import sourcemaps from 'gulp-sourcemaps';
import chalk from 'chalk';

import { cleanDist } from './clean';

import args from '../args';
import { appIterator } from '../apps';

const buildAll = appIterator("build", (app, resolve, reject) => {
  if (app.type === 'backend') {
    gulp.src(app.path.appSource)
      .pipe(sourcemaps.init())
      .pipe(to5({ presets: ['es2015', 'stage-1'] }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(app.path.appBuild))
      .on('end', () => {
        resolve();
      });
  } else if (app.type === 'frontend') {
    let env = args.env || 'dev';
    const aurelia = exec('yarn run au build --env ' + env, {
      cwd: app.path.appFolder
    });

    const tag = '[' + chalk.yellow(app.traceName) + '] ';
    aurelia.stdout.on('data', data => data.toString().trim().split('\n').forEach(line => console.log(tag + '%s', line)));
    aurelia.stderr.on('data', data => data.toString().trim().split('\n').forEach(line => console.error(tag + chalk.red('%s'), line)));
    aurelia.on('error', err => console.error(tag + 'aurelia-cli error: %s', err));
    return aurelia.on('exit', code => {
      console.log(tag + 'aurelia-cli exited with code [%s].', code)
      return resolve();
    });
  }
  // return resolve();
});

const buildNoAureliaFunc = appIterator("buildNoAurelia", (app, resolve, reject) => {
  if (app.type === 'backend') {
    gulp.src(app.path.appSource)
      .pipe(sourcemaps.init())
      .pipe(to5({ presets: ['es2015', 'stage-1'] }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(app.path.appBuild))
      .on('end', resolve);
  }
  return resolve();
});

const build = gulp.series(cleanDist, buildAll);
const buildNoAurelia = gulp.series(cleanDist, buildNoAureliaFunc);

export { build, buildNoAurelia };

gulp.task('build', build);
