import gulp from 'gulp';
import paths from '../paths';

import { serveAll } from './serve';
import args from '../args';
import { appIterator } from '../apps';

function watchBackend(done) {
  gulp.watch(paths.source);
  done();
}

const watchFunc = appIterator("watch", (app, resolve, reject) => {
    if (app.type === 'backend') {
        gulp.watch(app.path.appSource);
    }
  });

const watch = gulp.series(serveAll, watchFunc);
gulp.task('watch', watch);
