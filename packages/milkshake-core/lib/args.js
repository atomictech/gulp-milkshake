import _ from 'lodash';
import yargs from 'yargs';

const argv = yargs.argv;
// const validBumpTypes = 'major|minor|patch|prerelease'.split('|');
// const bump = _.defaultTo(argv.bump, 'patch').toString().toLowerCase();
const target = _.defaultTo(argv.target, '*').toString().toLowerCase();
const env = _.defaultTo(argv.env, 'dev').toString().toLowerCase();
// const platform = _.defaultTo(argv.platform, 'dev').toString().toLowerCase();
// const clean = _.defaultTo(argv.clean, false);
// const zip = _.defaultTo(argv.zip, false);
// const install = _.defaultTo(argv.install, false);

// if (validBumpTypes.indexOf(bump) === -1) {
//   throw new Error('Unrecognized bump "' + bump + '".');
// }

module.exports = {
  // bump: bump,
  target: target,
  env: env,
  // platform: platform,
  // clean: clean,
  // zip: zip,
  // install: install,
  // depth: parseInt(argv.depth || '0', 10)
};

