# generator-ng-factory [![Npm Version](https://img.shields.io/npm/v/generator-ng-factory.svg?style=flat)](https://www.npmjs.com/package/generator-ng-factory) [![Project Status](https://img.shields.io/badge/status-beta-blue.svg?style=flat)](https://github.com/ng-tools/generator-ng-factory)

A generator for [AngularJS](https://github.com/angular/angular.js) applications leveraging [ngFactory](https://github.com/ng-tools/ng-factory), the industrialized workflow for AngularJS.


## Getting Started

To install generator-angular-bootstrap from npm, run:

```bash
$ npm i -g yo bower generator-ng-factory
```

Finally, initiate the generator:

```bash
$ yo ng-factory
```

Once done, you can either use a global `gulp-cli#4.0` instance:

```bash
$ npm i -g gulpjs/gulp-cli#4.0
$ gulp serve
```

Or the local one that comes bundled in your node_modules:

```bash
$ node_modules/.bin/gulp serve
```

In that case, having an alias into your `.bash_aliases` like `alias lgulp="node_modules/.bin/gulp"` can help.


## Communication

- If you **need help**, use [Stack Overflow](http://stackoverflow.com/questions).
- If you'd like to **ask a general question**, use [Stack Overflow](http://stackoverflow.com/questions).
- If you **found a bug**, open an issue.
- If you **have a feature request**, open an issue.
- If you **want to contribute**, submit a pull request.


## Frequently Encountered Errors

```
/usr/local/lib/node_modules/gulp/bin/gulp.js:129
    gulpInst.start.apply(gulpInst, toRun);
                  ^
TypeError: Cannot read property 'apply' of undefined
    at /usr/local/lib/node_modules/gulp/bin/gulp.js:129:19
```
- You are using a `gulp#3.0` global instance to drive a `gulp#4.0` project, either install a global `gulp-cli#4.0` or use the local gulp.

```
[00:00:00] Error: Bower components directory does not exist at /home/foo/bar/app/bower_components
    at Error (native)
```
- You need to `bower i` first


## Copyright and license

    The MIT License

    Copyright (c) 2014-2015 Olivier Louvignes

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
