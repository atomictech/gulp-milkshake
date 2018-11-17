import gulp from 'gulp';
import chalk from 'chalk';
import fs from 'fs';

import { appIterator } from '../milkshake-core';

const version = appIterator('version', (app, id) => {
  console.log('app.type ', app.type);
  if (app.type === 'backend') {
    const pjson = JSON.parse(fs.readFileSync(`${app.path.appFolder}/package.json`));
    console.log(chalk.hex('#0000FF')('App ID : ') + chalk.hex('#FF0000')(id));
    console.log(chalk.hex('#0000FF')('   packageName : ') + chalk.hex('#00FF00')(pjson.name));
    console.log(chalk.hex('#0000FF')('   traceName   : ') + chalk.hex('#00FF00')(app.traceName));
    console.log(chalk.hex('#0000FF')('   type        : ') + chalk.hex('#00FF00')(app.type));
    console.log(chalk.hex('#0000FF')('   version     : ') + chalk.hex('#00FF00')(pjson.version));
  } else if (app.type === 'frontend') {
    const pjson = JSON.parse(fs.readFileSync(`${app.path.appFolder}/package.json`));
    console.log(chalk.hex('#0000FF')('App ID : ') + chalk.hex('#FF0000')(id));
    console.log(chalk.hex('#0000FF')('   packageName : ') + chalk.hex('#00FF00')(pjson.name));
    console.log(chalk.hex('#0000FF')('   traceName   : ') + chalk.hex('#00FF00')(app.traceName));
    console.log(chalk.hex('#0000FF')('   type        : ') + chalk.hex('#00FF00')(app.type));
    console.log(chalk.hex('#0000FF')('   version     : ') + chalk.hex('#00FF00')(pjson.version));
  }

  return Promise.resolve();
}, true);

export { version };

gulp.task('version', version);
