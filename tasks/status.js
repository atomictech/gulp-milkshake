import gulp from 'gulp';
import { exec } from 'child_process';
import chalk from 'chalk';

import args from '../args';
import { appIterator } from '../apps';

const status = appIterator('status', (app, resolve, reject) => {
    // const yarnCmd = spawn('cmd', ['/s', '/c', '"D:\\apps\\Yarn\\bin\\yarnpkg.cmd outdated"'], {
  const yarnCmd = exec('yarn outdated', {
    cwd: app.path.appFolder
  });

  yarnCmd.stdout.on('data', data => {
    data.toString().trim().split('\n').forEach(line => console.log(tag + '%s', line));
  });
  yarnCmd.stderr.on('data', data => data.toString().trim().split('\n').forEach(line => console.error(tag + chalk.red('%s'), line)));

  yarnCmd.on('readable', () => {
    const tag = '[' + chalk.yellow(app.traceName) + '] ';
    this.stdout.on('data', data => data.toString().trim().split('\n').forEach(line => console.log(tag + '%s', line)));
    this.stderr.on('data', data => data.toString().trim().split('\n').forEach(line => console.error(tag + chalk.red('%s'), line)));
  });

  const tag = '[' + chalk.yellow(app.traceName) + '] ';
  yarnCmd.on('error', err => console.error(tag + 'yarn error: %s', err));
  return yarnCmd.on('exit', code => {
    console.log(tag + 'yarn exited with code [%s].', code);
    return resolve();
  });
}, true);

export { status };

gulp.task(status);
