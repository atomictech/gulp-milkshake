#!/usr/bin/env node

const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const spawn = require('cross-spawn');
const commander = require('commander');

const MILKSHAKE_TASK_JSON = '.milkshake.tasks.json';

function findProjectRoot(base) {
  let prev = null;
  let dir = base;

  do {
    if (fs.existsSync(path.join(dir, MILKSHAKE_TASK_JSON))) {
      return dir;
    }

    prev = dir;
    dir = path.dirname(dir);
  } while (dir !== prev);

  return base;
}

function main() {
  commander.version('0.0.1');
  commander.usage('[command] [flags]');
  commander.option('--cwd <cwd>', 'working directory to use', process.cwd());

  let dir = findProjectRoot(commander.cwd);
  let tasksFile = JSON.parse(fs.readFileSync(path.join(dir, MILKSHAKE_TASK_JSON)));

  _.each(tasksFile.tasks, (t, name) => {
    let p = commander.command(name);

    _.each(t.options, opt => {
      p.option(opt.userFlag, opt.description)
    });

    p.action(cmd => {
      let npmc = tasksFile.npmClient || 'yarn';
      let computedArgs = [];

      computedArgs.push('gulp');
      computedArgs.push(name);
      _.each(t.options, opt => {
        computedArgs.push(`--${opt.taskFlag}`);
        computedArgs.push(cmd[opt.taskFlag]);
      });

      return spawn(npmc, computedArgs);
    });
  });

  commander.parse(process.argv);
}

module.exports = main;
