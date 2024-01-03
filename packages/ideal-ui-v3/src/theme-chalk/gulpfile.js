'use strict';
const { series, src, dest } = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const fsExtra = require('fs-extra');
const path = require('path');

const outputDir = path.resolve(__dirname, 'lib');

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cssmin())
    .pipe(dest('./lib'));
}

function createPackageJson(name) {
  const fileStr = `{
  "name": "${name}",
  "version": "0.0.0",
  "main": "index.css",
  "module": "index.css",
  "style": "index.css"
}`;

  fsExtra.outputFile(path.resolve(outputDir, `package.json`), fileStr, 'utf-8');
}

exports.build = series(compile);

createPackageJson('theme-chalk');
