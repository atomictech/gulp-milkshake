import spawn from 'cross-spawn';

import plugin from '../milkshake-aurelia';

plugin.task('buildAll', (tag, app, id, done) => {
  let env = args.env || 'dev';
  const aurelia = spawn('au', ['build', '--env', env], {
    cwd: app.path.appFolder
  });

  aurelia.stdout.on('data', data => data.toString().trim().split('\n').forEach(line => console.log(`${tag} ${line}`)));
  aurelia.stderr.on('data', data => data.toString().trim().split('\n').forEach(line => console.error(`${tag} ${line}`)));
  aurelia.on('error', err => console.error(`${tag} aurelia-cli error: ${err}`));
  aurelia.on('exit', code => {
    if (code !== 0) {
      throw new Error(`aurelia-cli for ${tag} crashed with code [${code}].`);
    }
    console.log(`${tag} aurelia-cli exited with code [${code}].`);
  });

  return aurelia;
});

plugin.task('build', plugin.series('cleanDist', 'buildAll'));
