import { exec } from 'child_process';
import gulp from 'gulp';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import jeditor from 'gulp-json-editor';
import yarn from 'gulp-yarn';

import { cleanExport } from './clean';
import { build } from './build';

import args from '../args';
import { appIterator } from '../apps';

const exportCopy = appIterator("exportCopy", (app, resolve, reject) => {
  if (app.type === 'backend') {
    gulp.src(app.export, { base: '.' })
      .pipe(rename((path) => {
        let baseDistDir = app.path.appBuild.replace(/[\/\\]/gi, '[\\/\\\\]');
        let baseDir = app.path.appFolder.replace(/[\/\\]/gi, '[\\/\\\\]');
        path.dirname = path.dirname.replace(new RegExp(baseDistDir, "gi"), '');
        path.dirname = path.dirname.replace(new RegExp(baseDir, "gi"), '');
      }))
      // .pipe(print())
      .pipe(gulp.dest(app.path.appExport))
      .on('end', () => {
        resolve();
      });
  } else if (app.type === 'frontend') {
    let cmd = 'cd ' + app.path.appFolder + ' rm -rf scripts && yarn run au build';
    let child = exec(cmd, (err, stdout, stderr) => {
      gulp.src(app.export)
        .pipe(gulp.dest(app.path.appExport)
          .on('end', () => {
            resolve();
          }));
    });
    child.stderr.pipe(process.stderr);
  } else {
    resolve();
  }
});

const exportPackage = appIterator("exportPackage", (app, resolve, reject) => {
  if (app.type === 'backend') {
    gulp.src(app.path.appFolder + '/package.json')
      .pipe(jeditor({
        main: '/index.js',
        scripts: {
          start: 'node index.js'
        }
      }))
      .pipe(gulp.dest(app.path.appExport))
      .on('end', () => {
        resolve();
      });
  } else {
    resolve();
  }
});

const modifyExport = appIterator("modifyExport", (app, resolve, reject) => {
  if (app.type === 'frontend') {
    gulp.src(app.path.appExport + '/index.html')
      .pipe(replace(/<base href=\"\/\">/, '<base href="' + app.baseURL + '">'))
      .pipe(gulp.dest(app.path.appExport))
      .on('end', () => {
        resolve();
      });
  } else {
    resolve();
  }
});

const exportInstall = appIterator("exportInstall", (app, resolve, reject) => {
  if (args.install && app.type === 'backend') {
    gulp.src([
      app.path.appExport + '/package.json',
      app.path.appExport + '/yarn.lock'
    ])
      .pipe(gulp.dest(app.path.appExport + '/'))
      .pipe(yarn({ production: true }))
      .on('end', () => {
        resolve();
      });
  } else {
    resolve();
  }
});

const exportTask = gulp.series(
  cleanExport,
  build,
  exportCopy,
  modifyExport,
  exportPackage,
  exportInstall
);
export { exportTask };

gulp.task('export', exportTask);
