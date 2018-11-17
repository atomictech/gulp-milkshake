[![Build Status](https://travis-ci.org/milkshakejs/milkshake.svg?branch=master)](https://travis-ci.org/milkshakejs/milkshake)
[![Coverage Status](https://coveralls.io/repos/github/milkshakejs/milkshake/badge.svg?branch=master)](https://coveralls.io/github/milkshakejs/milkshake?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/05ef990fe1ccb3e56067/maintainability)](https://codeclimate.com/github/milkshakejs/milkshake/maintainability)
[![David](https://img.shields.io/david/milkshakejs/milkshake.svg)](https://david-dm.org/milkshakejs/milkshake)
[![Known Vulnerabilities](https://snyk.io/test/github/milkshakejs/milkshake/badge.svg)](https://snyk.io/test/github/milkshakejs/milkshake)

[![Downloads](https://img.shields.io/npm/dm/milkshake.svg)](https://www.npmjs.com/package/milkshake)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%milkshakejs%milkshake.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%milkshakejs%milkshake?ref=badge_shield)

# MilkshakeJS [![NPM version](https://img.shields.io/npm/v/milkshake.svg)](https://www.npmjs.com/package/milkshake-core)

Milkshake provide an easy way to define and implement a unified task logic among a set of different applications (or packages) in a mono-repository.

**Website**: [https://milkshake.io](https://github.com/atomictech/milkshake)
**Documentation**: [https://milkshake.io/docs](https://github.com/atomictech/milkshake)

# Why ?

As in a real milkshake (my favorite mix: vanilla, strawberry, banana), you can mix different technical flavors (node.js app, react app, cordova app, aurelia app) in one repository and still have one delicious task workflow at the end!

## The existing
Mono repos are more and more common among teams, and tools like lerna allow you to easly manage dependencies between packages.
Also, npm scripts (based on gulp or other task system) allow you to easly execute tasks on those packages / apps.

## The problems
- Some of those tasks can be identical and duplicated in  different folders. In that case, those tasks can be anoying to keep in sync when modifications occur in one of them.
- Packages or apps of a mono repository can use different technologies and require different actions for a common objective. For example all the packages of a mono repos will probably need a build task, but how each package is built is dependent of the tech it uses.
- On mono repos, developer ownership of pacakges can differ from one package to another and so the tasks or script needed for it. global task name coherency is needed to be able to bulkly apply a task on all the repository.
- Tools like Lerna allow to run npm scripts on all its packages, but does not allow executing tasks on a subset of the packages. And what about the mono repos not managed by lerna?

Milkshake mainly aims to solve those problems and provide a default set of tasks that cover common actions in the mainly used web frameworks out of the box. 
But if you want some custom task naming or logic, you can also define your own set of tasks that are applicable to your repository and implement them to handle each technology your repository package or application use.

## To be or not to be

### What milkshake is
* Modular (milkshake-core, and milkshake-* for each type of supported app stack)
* In early development stage, milkshake-core not reached v1 yet
* Built on top of gulp
* Written in es6, transpiled with babel


### what milkshake is NOT
* Widely used (yet hopefully).
* A replacement or alternative to lerna
* A potato

# Installation
To  help manage your milkshake tasks we provide a CLI, install it globally
```
$ npm install milkshake-cli -g
```
or
```
$ yarn global add milkshake-cli
```

# Add Milkshake to your project
Use the Milkshake CLI tool to manage your project tasks

1. Initialize milkshake in your project directory (that should already contain a package.json)
    ```bash
    $ mk init 
    ```
    > Follow the interactive milkshake configuration
    
2. Add application of packages to your project
    ```bash
    $ mk add ApplicationName
    ```
    > Follow the interactive application configuration
    
3. List the tasks available for your project
    ```bash
    $ mk help
    ```

4. List the applications / or package of your project
    ```bash
    $ mk list
    ```

:tada:**Congratulations! Your first Milkshake task based project is ready.

# Default task workflow

## mk build
## mk watch
## mk test
## mk release
## mk export

# Changelog
See [CHANGELOG.md](CHANGELOG.md).

# Contributions
We welcome you to join to the development of Milkshake. 

# License
Milkshake is available under the [MIT license](https://tldrlegal.com/license/mit-license).

# Contact
Copyright (c) 2018 MilkshakeJS
