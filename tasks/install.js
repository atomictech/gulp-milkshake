import gulp from 'gulp';
import { exec } from 'child_process';
import chalk from 'chalk';

import { appIterator } from '../apps';
import { cleanModules } from './clean';

const installYarn = appIterator('install', (app, resolve, reject) => {
  const yarnInstall = exec('yarn', {
    cwd: app.path.appFolder
  });

  const tag = '[' + chalk.yellow(app.traceName) + '] ';
  yarnInstall.stdout.on('data', data => data.toString().trim().split('\n').forEach(line => console.log(tag + '%s', line)));
  yarnInstall.stderr.on('data', data => data.toString().trim().split('\n').forEach(line => console.error(tag + chalk.red('%s'), line)));
  yarnInstall.on('error', err => console.error(tag + 'yarn error: %s', err));
  yarnInstall.on('exit', code => {
    console.log(tag + 'yarn exited with code [%s].', code);
    resolve();
  });
  yarnInstall.on('end', () => {
    resolve();
  });
}, true);

const install = gulp.series(cleanModules, installYarn);

export { install };

gulp.task('install', install);
