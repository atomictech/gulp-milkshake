import gulp from 'gulp';
import run from 'gulp-run';

import { cleanCoverageServer, cleanCoverageFunc } from './clean';

const BACKEND_JS_TEST_FILES = [
  'backends/corpomakers/test/spec/*.js'
];

const FUNC_JS_TEST_FILES = [
  'backends/corpomakers/test/func/*.js'
];

function _mocha(type, testFiles) {
  return () => {
    return run('nyc --report-dir "coverage/' + type + '" mocha -r "./backends/corpomakers/test/setup" --recursive "' + testFiles + '"').exec();
  };
}

const testBackend = gulp.series(cleanCoverageServer, _mocha('server', BACKEND_JS_TEST_FILES));
const testFunc = gulp.series(cleanCoverageFunc, _mocha('func', FUNC_JS_TEST_FILES));
const testTask = gulp.series(testBackend, testFunc);

gulp.task('test-backend', testBackend);
gulp.task('test-func', testFunc);
gulp.task('test', testTask);

