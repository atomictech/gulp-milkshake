import gulp from 'gulp';
import chalk from 'chalk';

const help = (resolve, reject) => {
    console.log('');
    console.log(chalk.hex('#00FF00')('Usage'));
    console.log(chalk('   yarn run gulp [TASK] [OPTIONS...]'));
    console.log('');
    console.log(chalk.hex('#0000FF')('   task') + chalk.hex('#FFFFFF')('   theses tasks are the main tasks to call'));
    console.log(chalk.hex('#0066FF')('   task') + chalk.hex('#FFFFFF')('   theses tasks are sub-tasks that can still be called directly if necessary'));
    console.log('');

    console.log(chalk.hex('#00FF00')('Available tasks'));
    console.log(chalk.hex('#0000FF')('   help') + chalk.hex('#FFFFFF')('                  Display this usage text.'));
    console.log(chalk.hex('#0000FF')('   version') + chalk.hex('#FFFFFF')('               List the apps in this repos, and their versions.'));
    console.log('');
    
    console.log(chalk.hex('#0000FF')('   (*) all tasks') + chalk.hex('#FFFFFF')('         All the following tasks have this arguments in common.'));
    console.log(chalk('     --') + chalk.hex('#0000FF')('target ') + chalk.hex('#777777')('"name"     Optional (default is all the apps), app that you want to target from the apps.js config.'));
    console.log('');

    console.log(chalk.hex('#0000FF')('   install') + chalk.hex('#FFFFFF')('               Remove and re-install all the node_modules of the targeted app.'));
    console.log(chalk.hex('#0000FF')('   status') + chalk.hex('#FFFFFF')('                Check dependencies and display outdated packages.'));
    console.log(chalk.hex('#0000FF')('   watch') + chalk.hex('#FFFFFF')('                 Build, serve and watch sources, this is all you need to start running the apps.'));
    console.log(chalk.hex('#0000FF')('   build') + chalk.hex('#FFFFFF')('                 Transpile, minimize and/or bundle all sources into a dist or script folder.'));
    console.log(chalk('     --') + chalk.hex('#0000FF')('env ') + chalk.hex('#777777')('"dev|prod"    Default dev, for frontend app build with minification for prod, and none for dev.'));
    
    console.log(chalk.hex('#0000FF')('   serve') + chalk.hex('#FFFFFF')('                 Start the backend(s) apps or start a static node.js server that serve the app.'));

    console.log(chalk.hex('#0000FF')('   clean') + chalk.hex('#FFFFFF')('                 Remove all the builded content in dist or scripts folders, also clear coverage and exports.'));
    console.log(chalk('     --') + chalk.hex('#0000FF')('light ') + chalk.hex('#777777')('            Optional, clean only the dist or script folder (don\'t touch at the export and coverage).'));
    
    console.log(chalk.hex('#0000FF')('   lint') + chalk.hex('#FFFFFF')('                  Use eslint to lint all the sources, and display the output in the console.'));
    console.log(chalk.hex('#0000FF')('   release') + chalk.hex('#FFFFFF')('               Clean everything, then call a prepare a release.'));
    console.log(chalk('     --') + chalk.hex('#0000FF')('bump ') + chalk.hex('#777777')('"major|minor|patch|prerelease"     Optional (default to "patch"), will impact the version number accordingly.'));    
    console.log(chalk('     --') + chalk.hex('#0000FF')('zip ') + chalk.hex('#777777')('              Optional, when release is ready and exported, it zip the folder(s).'));

    console.log(chalk.hex('#0066FF')('   prepare-release') + chalk.hex('#FFFFFF')('       Bump the version, build and export the apps.'));
    console.log(chalk('     --') + chalk.hex('#0066FF')('bump ') + chalk.hex('#777777')('"major|minor|patch|prerelease"     Optional (default to "patch"), will impact the version number accordingly.'));
    
    console.log(chalk.hex('#0066FF')('   zip') + chalk.hex('#FFFFFF')('                   Zip the export forlder(s).'));
    console.log(chalk.hex('#0066FF')('   export') + chalk.hex('#FFFFFF')('                Copy the builded apps into their export folder, and edit the apps to be production ready.'));
    console.log(chalk.hex('#0000FF')('   test') + chalk.hex('#FFFFFF')('                  Run all the tests available on the apps.'));
    console.log(chalk.hex('#0066FF')('   test-backend') + chalk.hex('#FFFFFF')('          Run only the backend api test if they exists for the current app.'));
    console.log(chalk.hex('#0066FF')('   test-func') + chalk.hex('#FFFFFF')('             Run only the functional tests if they exists for the current app.'));

    return resolve();
}

export { help };

gulp.task(help);
gulp.task('default', help);
