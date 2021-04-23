#!/usr/bin/env node

'use strict';

const ExifImage = require('exif').ExifImage;

var program = require('commander');

program
  .version(require('./package.json').version)
  .usage('<file ...> [options]')
  .parse(process.argv);

var files = program.args;

console.info('Number of files to check: ' + files.length);

var hasexif = false;

files.forEach(function(filePath) {
  try {
    new ExifImage({ image : filePath }, function (error, exifData) {
      console.log("Checking: " + filePath);
      if (error) {
        return console.log(`Error: ${error.message}`);
      }
      for (var key in exifData) {
        if (exifData.hasOwnProperty(key)) {
          if (Object.keys(exifData[key]).length != 0) {
            console.error(exifData);
            hasexif = true;
            break;
          }
        }
      }
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
});

process.on('exit', function() {
  if (hasexif) {
    process.exit(1);
  }
});
