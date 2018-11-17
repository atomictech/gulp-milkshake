# `milkshake-core`

## Value proposition
milkshake: mix flavors, have one drink.

milkshake is an easy way to define and implement a unified task logic among a set of different applications (or packages) in a mono repos.

As in a real milkshake (my favorite mix: vanilla, strawberry, banana), you can mix different technical flavors (node.js app, react app, cordova app, aurelia app) in one repository and still have one delicious task workflow at the end!

## The existing
Mono repos are more and more common among teams, and tools like lerna allow you to easly manage dependencies between packages.
Also, npm scripts (based on gulp or other task system) allow you to easly execute tasks on those packages / apps.

## The problems
Problem 1: Some of those tasks can be identical and duplicated in  different folders. In that case, those tasks can be anoying to keep in sync when modifications occur in one of them.

Problem 2: Packages or apps of a mono repository can use different technologies and require different actions for a common objective. For example all the packages of a mono repos will probably need a build task, but how each package is built is dependent of the tech it uses.

Problem 3: On mono repos, developer ownership of pacakges can differ from one package to another and so the tasks or script needed for it. global task name coherency is needed to be able to bulkly apply a task on all the repository.

Problem 4: Tools like Lerna allow to run npm scripts on all its packages, but does not allow executing tasks on a subset of the packages. And what about the mono repos not managed by lerna?

milkshake mainly aims to solve those problems.

## To be or not to be

### What milkshake is
* Modular (milkshake-core, and milkshake-* for each type of supported app stack)
* In early development stage, milkshake-core not reached v1 yet (as of Oct 2018)
* Built on top of gulp
* Written in es6, transpiled with babel


### what milkshake is NOT
* Widely used (yet hopefully).
* A replacement or alternative to lerna
* A potato


# don't know where to put that
milkshake offers a common set of tasks that cover common actions in the mainly used web frameworks out of the box. You can also define your own set of tasks that should be applicable to your repos and implement then to handle each technology your repository package or application use.


## Usage

```
const milkshakeCore = require('milkshake-core');

// TODO: DEMONSTRATE API
```
