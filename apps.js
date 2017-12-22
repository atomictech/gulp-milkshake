import fs from 'fs';
import _ from 'lodash';
import sequence from 'promise-sequence';

import args from './args';

function appExist(name) {
  if (name === 'all' || _.has(appConfig, name)) {
    return 1;
  }
  throw new Error('Unrecognized target application "' + name + '".');
}

function appGetCurrent(name) {
  if (name === 'all' || _.isNil(name) || (appExist(name) < 0)) {
    return appConfig;
  }
  return [appConfig[name]];
}

function appIterator(name, action, series) {
  const act = action;
  let fn = null;
  series = series || false;

  if (!series) {
    fn = () => {
      let p = [];
      _.each(appGetCurrent(args.target), (app, id) => {
        p.push(new Promise((resolve, reject) => {
          return act(app, resolve, reject, id);
        }));
      });

      return Promise.all(p);
    };
  } else {
    let seriesArr = [];
    fn = () => {
      _.each(appGetCurrent(args.target), (app, id) => {
        seriesArr.push(() => new Promise((resolve, reject) => {
          return act(app, resolve, reject, id);
        }));
      });
      return sequence(seriesArr);
    };
  }

  // big hack to make gulp think he should write that task name in the console
  Object.defineProperty(fn, 'name', {
    writable: true,
    value: name
  });

  return fn;
}

const appConfig = JSON.parse(fs.readFileSync('../milkshake.json'));

export { appConfig, appExist, appGetCurrent, appIterator };

