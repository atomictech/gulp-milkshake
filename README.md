<p align="center">
    <a href="https://www.npmjs.com/package/gulp-milkshake"><img src="https://img.shields.io/npm/v/gulp-milkshake.svg"></a>&nbsp;&nbsp;
    <a href="https://raw.githubusercontent.com/atomictech/gulp-milkshake/master/LICENSE" alt="License"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>&nbsp;&nbsp;
</p>

# gulp-milkshake

Handle repository applications building, packaging and watch through gulp and a minimal configuration to declare multiple apps in the same repository

## Installation

Run `yarn add gulp-milkshake --dev` at the root of your repository

## Usage

### Configuration

gulp milshake is build on top of gulp. It require two files in your repository to work :
* gulpfile.babel.js
* milkshake.json

both files should exist at the root of your repository and be configured like the following.

#### gulpfile configuration

This file tells gulp how to load the gulp-milshake tasks

Create a `gulpfile.babel.js` at the root of your repository that contains the following :
```js
require("gulp-milkshake");
```

#### milkshake.json configuration

This file allow you to declare `apps` in your repository. It is usefull if you want to have a backend and frontend project both in your repository.
gulp-milshake will allow you to have different packages, version, way to build and export those two apps.
The goal is not to recreate grunt on top of gulp, so those apps configuration will be minimal. if you need to have some custom complex tasks for those apps you can create your own tasks that will adress each app. Finaly if your build toolchain is too custom and doesn"t fit this multi apps scheme, don"t use this plugin.

Here is an example of a backend & frontend configuration

```json
{
  "myBackend": {
    "type": "backend",
    "traceName": "myBackend-Trace",
    "path": {
      "appFolder": "backends/myBackend",
      "appRoot": "backends/myBackend/src",
      "appSource": "backends/myBackend/src/**/*.js",
      "appIndex": "backends/myBackend/src/index.js",
      "appEnv": "backends/myBackend/src/config/local.env.js",
      "appCoverageMain": "backends/myBackend/coverage/api",
      "appCoverageFunc": "backends/myBackend/coverage/func",
      "appBuild": "backends/myBackend/dist",
      "appExport": "exports/myBackend",
      "appRelease": "release/myBackend",
      "doc": "backends/myBackend/doc"
    },
    "export": [
      "backends/myBackend/yarn.lock",
      "backends/myBackend/dist/**/*",
      "!backends/myBackend/dist/**/*.map"
    ]
  },
  "myFrontend": {
    "type": "frontend",
    "traceName": "myFrontend-Trace",
    "path": {
      "appFolder": "clients/myFrontend",
      "appRoot": "clients/myFrontend/src",
      "appSource": "clients/myFrontend/src/**/*.js",
      "appIndex": "clients/myFrontend/index.html",
      "appEnv": "clients/myFrontend/src/environment.js",
      "appPackage": "clients/myFrontend/package.json",
      "appCoverageMain": "clients/myFrontend/coverage/main",
      "appCoverageFunc": "clients/myFrontend/coverage/func",
      "appBuild": "clients/myFrontend/scripts",
      "appExport": "exports/myBackend/public",
      "appRelease": "release/myBackend/public",
      "doc": "clients/myFrontend/doc"
    },
    "baseURL": "/",
    "export": [
      "clients/myFrontend/index.html",
      "clients/myFrontend/favicon.png",
      "clients/myFrontend/@(scripts)/**/*.*",
      "clients/myFrontend/@(assets)/**/*.*"
    ]
  }
}
```