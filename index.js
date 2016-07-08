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

for (var cnt = 0, len = files.length; cnt < len; cnt++) {
  var filePath = files[cnt];
  console.log("Checking:" + filePath);
  try {
    new ExifImage({ image : filePath }, function (error, exifData) {
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
}

process.on('exit', function() {
  process.exit(1);
});
