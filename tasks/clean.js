import _ from 'lodash';
import gulp from 'gulp';
import del from 'del';

import args from '../args';
import { appIterator } from '../apps';

const cleanDist = appIterator("cleanDist", (app, resolve, reject) => {
  const p = [];
  if (!_.isNil(app.path.appBuild)) {
    p.push(del(app.path.appBuild));
  }

  return Promise.all(p).then(() => {
    return resolve();
  });
});

const cleanCoverageServer = appIterator("cleanCoverageServerMain", (app, resolve, reject) => {
  if (app.type === 'backend') {
    return del(app.path.appCoverageMain)
      .then(() => {
        return resolve();
      });
  }
  return resolve();
  // return reject(new Error("Cannot execute coverage server on non-server app"));
});

const cleanCoverageFunc = appIterator("cleanCoverageFunc", (app, resolve, reject) => {
  if (app.type === 'backend') {
    return del(app.path.appCoverageFunc)
      .then(() => {
        return resolve();
      });
  }
  return resolve();
});

const cleanExport = appIterator("cleanExport", (app, resolve, reject) => {
  const p = [];
  if (!_.isNil(app.path.appExport)) {
    p.push(del(app.path.appExport));
  }

  return Promise.all(p).then(() => {
    return resolve();
  });
});

const cleanModules = appIterator("cleanModules", (app, resolve, reject) => {
  if (args.clean) {
      del(app.path.appFolder + '/node_modules')
          .then(() => {
              return resolve();
          });
  }
  return resolve();
});

const cleanCoverage = gulp.series(cleanCoverageFunc, cleanCoverageServer);
const clean = gulp.series(cleanDist, cleanExport, cleanCoverage);

export { clean, cleanDist, cleanExport, cleanCoverageFunc, cleanCoverageServer, cleanModules };

gulp.task('clean', clean);
