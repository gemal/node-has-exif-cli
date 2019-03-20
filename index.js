#!/usr/bin/env node

'use strict';
const ExifImage = require('exif').ExifImage;
const program = require('commander');
/**
 * Check a folder.
 * @return {boolean}
 */
function checkFiles() {
    var hasexif = false;
    files.forEach(function(filePath) {
        console.log("Checking1:" + filePath);
        try {
            new ExifImage({image: filePath}, function(error, exifData) {
                console.log("Checking:" + filePath);
                if (error) {
                    return console.error(`Error: ${error.message}`);
                }
                for (var key in exifData) {
                    if (exifData.hasOwnProperty(key)) {
                        if (Object.keys(exifData[key]).length != 0) {
                            console.error(exifData);
                            console.log("set true");
                            hasexif = true;
                            break;
                        }
                    }
                }
            });
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    });
    console.log("hasexif:" + hasexif);
    return hasexif;
}

program
        .version(require('./package.json').version)
        .description('Checks if all images in CSS files exists')
        .usage('<file ...> [options]')
        .option('-v, --verbose', 'Add more output')
        .parse(process.argv);

const files = program.args;
console.log(files);

if (files.length > 0) {
    console.info('Number of files to check: ' + files.length);
    const exif = checkFiles();
    console.log("returned");
    console.log(exif ? "true" : "false");
    if (exif) {
        process.exitCode = 1;
    } else {
        process.exitCode = 0;
    }
} else {
    console.error('Oops! No files specified');
    process.exitCode = 2;
}
