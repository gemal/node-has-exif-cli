#!/usr/bin/env node

'use strict';

const ExifImage = require('exif').ExifImage;

const program = require('commander');

program
    .version(require('./package.json').version)
    .usage('<file ...> [options]')
    .parse(process.argv);

const files = program.args;

console.info('Number of files to check: ' + files.length);

let hasexif = false;

files.forEach(function(filePath) {
    try {
        new ExifImage({image: filePath}, function(error, exifData) {
            console.log('Checking: ' + filePath);
            if (error) {
                return console.log(`Error: ${error.message}`);
            }
            for (const key in exifData) {
                if (Object.prototype.hasOwnProperty.call(exifData, key)) {
                    if (Object.keys(exifData[key]).length != 0) {
                        console.log(exifData);
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
