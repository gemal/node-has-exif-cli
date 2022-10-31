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
    console.log('Checking: ' + filePath);
    ExifReader.load(filePath, {expanded: true}).then(function(tags) {
        if (tags.exif && Object.keys(tags.exif).length !== 0) {
            console.log('ERROR: Exif data found for: ' + filePath);
            hasexif = true;
        }
    }).catch(function(error) {
        if (error instanceof exifErrors.MetadataMissingError === false) {
            console.log('ERROR: ' + error + ' for:' + filePath);
            haserror = true;
        }
    });
});

process.on('exit', function() {
    if (hasexif || haserror) {
        process.exit(1);
    }
});
