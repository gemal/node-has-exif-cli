#!/usr/bin/env node

'use strict';

const ExifReader = require('exifreader');
const exifErrors = ExifReader.errors;

const {program} = require('commander');

program
    .version(require('./package.json').version)
    .usage('<file ...> [options]')
    .parse(process.argv);

const files = program.args;

console.info('Number of files to check: ' + files.length);

let hasexif = false;
let haserror = false;

files.forEach(function(filePath) {
    ExifReader.load(filePath, {expanded: true}).then(function(tags) {
        console.log('Checking: ' + filePath);
        if (tags.exif) {
            console.log('ERROR: Exif data found: ' + filePath);
            hasexif = true;
        }
    }).catch(function(error) {
        if (error instanceof exifErrors.MetadataMissingError) {
            console.log('ERROR: No exif data found: ' + filePath);
        } else {
            console.log('ERROR: ' + error);
        }
        haserror = true;
    });
});

process.on('exit', function() {
    if (hasexif || haserror) {
        process.exit(1);
    }
});
