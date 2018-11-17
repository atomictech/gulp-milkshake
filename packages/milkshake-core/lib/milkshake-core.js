import _ from 'lodash';
import gulp from 'gulp';
import chalk from 'chalk';

import args from './args';
// import * as appConfig from '../../.milkshake.json';

class Milkshake {
  _plugins = {};
  _config = {};

  constructor() {

  }

  loadPlugin(plugin) {
    let p = new plugin();
    if (_.isNil(p.getType())) {
      throw Error('Cannot load plugin that has no type !');
    }

    this._appPlugin[p.getType()] = p;
  }

  appExist(name) {
    let appsNames = _.split(name, ',');
    let hasApps = true;

    _.each(appsNames, a => {
      hasApps = hasApps && _.has(this._config, a);
    });

    if (name === '*' || hasApps) {
      return 1;
    }
    throw new Error('Unrecognized target application "' + name + '".');
  }

  appGetCurrent(name) {
    let outApps = {};

    if (name === '*' || _.isNil(name) || (this.appExist(name) < 0)) {
      return this.appConfig;
    }

    _.each(_.split(name, ','), a => {
      outApps[a] = this.appConfig[a];
    });

    return outApps;
  }

  appIterator(name, action, series) {
    const act = action;
    series = series || false;

    let gulpTasks = [];
    _.each(this.appGetCurrent(args.target), (app, id) => {
      let fn = (done) => act(app, id, done);
      // hack to make gulp think he should write that task name in the console
      Object.defineProperty(fn, 'name', {
        writable: true,
        value: `${name}(${app.traceName})`
      });
      gulpTasks.push(fn);
    });

    return (!series) ? gulp.parallel(gulpTasks) : gulp.series(gulpTasks);
  }

  declareType(typename, module) {
    this._appPlugin[typename] = module;
  }

  task(name, isSerie) {
    let iteratorGenerator = this.appIterator(name, (app, id, done) => {
      const tag = `[${chalk[app.color || 'yellow'](app.traceName)}]`;

      if (!_.isNil(this._appPlugin[app.type])) {
        return this._appPlugin[app.type].execTask(name, tag, app, id, done);
      }

    }, isSerie);
    gulp.task(name, iteratorGenerator);
  }

  loadDefaultTasks() {
    this.task('build', true);
    this.task('version');
    this.task('help');
  }

  load(options) {
    this._config = options;

    if (_.isNil(options)) {
      this._config = require('../../../.milkshake');
    }

    this.loadDefaultTasks();
  }
}

module.exports = new Milkshake();
