import _ from 'lodash';
import gulp from 'gulp';

export class MilkshakePlugin {
  _tasks = {};

  constructor() {

  }

  getType() {
    return null;
  }

  series(...tasks) {
    let pTasks = [];

    _.each(tasks, t => {
      let validTask = this.findTask(t);

      if (!_.isNil(validTask)) {
        pTasks.push(validTask);
      } else {
        console.log(`[Milkshake] Plugin ${this.getType()} cannot find a task in a series`);
      }
    });
    return gulp.series(pTasks);
  }

  parallel(...tasks) {
    let pTasks = [];

    _.each(tasks, t => {
      let validTask = this.findTask(t);

      if (!_.isNil(validTask)) {
        pTasks.push(validTask);
      } else {
        console.log(`[Milkshake] Plugin ${this.getType()} cannot find a task in a parallel`);
      }
    });

    return gulp.parallel(pTasks);
  }

  execTask(name, tag, app, id, done) {
    if (!_.isNil(this._tasks[name])) {
      return this._tasks[name](tag, app, id, done);
    }
    console.log(`${tag} NO TASK DEFINED FOR THIS APP TYPE.`);
  }

  task(name, fn) {
    this._tasks[name] = fn;
  }
}
