#!/usr/bin/env node

'use strict';

const ExifReader = require('exifreader');
const exifErrors = ExifReader.errors;

const { program } = require('commander');

program
    .version(require('./package.json').version)
    .argument('<file...>', 'image files to check')
    .parse(process.argv);

const files = program.args;

console.log('Number of files to check: ' + files.length);

let hasexif = false;
let haserror = false;

Promise.all(files.map(function(filePath) {
    console.log('Checking: ' + filePath);
    return ExifReader.load(filePath, { expanded: true }).then(function(tags) {
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
})).then(function() {
    if (hasexif || haserror) {
        process.exit(1);
    }
});
