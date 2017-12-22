import _ from 'lodash';
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import gulpMultiProcess from 'gulp-multi-process';
import { exec } from 'child_process';
import env from 'gulp-env';
import chalk from 'chalk';

import { buildNoAurelia } from './build';

import args from '../args';
import { appIterator, appConfig } from '../apps';

//--------------------------------------------------------------------------------------------------
// HANDLE BACKENDS (with nodemon)
//--------------------------------------------------------------------------------------------------
const startBackends = [];
_.each(appConfig, (app, appId) => {

  if (app.type === 'backend') {

    startBackends.push('serve' + appId);

    const serverTask = () => {
      env({
        file: app.path.appEnv,
        vars: {
          // any variables you want to overwrite
        }
      });

      let started = false;
      return nodemon({
        script: app.path.appIndex,
        nodeArgs: ['--inspect', '--nolazy', '--debug-port=' + (app.inspectorPort || 9229)],
        ignore: ['build/*', 'clients/*', 'db/*', '**/node_modules/*', '**/dist/*'],
        watch: [app.path.appRoot + '/*'],
        stdout: false,
        readable: false
      })
        .on('start', function () {
          // to avoid nodemon being started multiple times

          if (!started) {
            // cb();
            started = true;
          }
        })
        .on('readable', function () {
          const tag = '[' + chalk.blue(app.traceName) + '] ';
          this.stdout.on('data', data => data.toString().trim().split('\n').forEach(line => console.log(tag + '%s', line)));
          this.stderr.on('data', data => data.toString().trim().split('\n').forEach(line => console.error(tag + chalk.red('%s'), line)));
        });
    };

    gulp.task('serve' + appId, serverTask);
  }
});
//--------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------
// HANDLE FRONTENDS
//--------------------------------------------------------------------------------------------------
const startFrontends = appIterator("serve", (app, resolve, reject, id) => {
  if (app.type === 'frontend') {
    let env = args.env || 'dev';
    const aurelia = exec('yarn run au run --env ' + env + ' --watch', {
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
  return resolve();
});
gulp.task('serveFrontends', startFrontends);
//--------------------------------------------------------------------------------------------------


const serveApps = (resolve, reject) => {
  let t = ['serveFrontends'];
  t = t.concat(startBackends);
  gulpMultiProcess(t, () => { return; }, true);
  return resolve();
}
const serveAll = gulp.series(buildNoAurelia, serveApps);

export { serveAll };

gulp.task('serve', serveAll);

