#!/usr/bin/env node

import fs from 'node:fs';
import { program } from 'commander';
import ExifReader from 'exifreader';

const exifErrors = ExifReader.errors;
const packageJson = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url)));

// strip control characters so malicious file names cannot inject
// terminal escape sequences into the output
// eslint-disable-next-line no-control-regex
const sanitize = (text) => text.replace(/[\u0000-\u001f\u007f-\u009f]/g, '');

program
    .version(packageJson.version)
    .argument('<file...>', 'image files to check')
    .parse(process.argv);

const files = program.args;

console.log('Number of files to check: ' + files.length);

let hasexif = false;
let haserror = false;

Promise.all(files.map(function(filePath) {
    console.log(sanitize('Checking: ' + filePath));
    return ExifReader.load(filePath, { expanded: true }).then(function(tags) {
        if (tags.exif && Object.keys(tags.exif).length !== 0) {
            console.log(sanitize('ERROR: Exif data found for: ' + filePath));
            hasexif = true;
        }
    }).catch(function(error) {
        if (error instanceof exifErrors.MetadataMissingError === false) {
            console.log(sanitize('ERROR: ' + error + ' for:' + filePath));
            haserror = true;
        }
    });
})).then(function() {
    if (hasexif || haserror) {
        process.exitCode = 1;
    }
});
