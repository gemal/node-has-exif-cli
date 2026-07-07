#!/usr/bin/env node

'use strict';

const ExifReader = require('exifreader');
const exifErrors = ExifReader.errors;

const { program } = require('commander');

program
    .version(require('./package.json').version)
    .argument('<file...>', 'image files to check')
    .option('--xmp', 'also fail if XMP metadata is found')
    .option('--iptc', 'also fail if IPTC metadata is found')
    .parse(process.argv);

const files = program.args;
const options = program.opts();

// strip control characters (ANSI escapes, carriage returns) so crafted
// file names or error messages cannot spoof lines in (CI) logs
function sanitize(value) {
    let out = '';
    for (const char of String(value)) {
        const code = char.codePointAt(0);
        out += code < 0x20 || (code >= 0x7f && code <= 0x9f) ? '?' : char;
    }
    return out;
}

// exifreader includes the raw XMP document under _raw; only real tags count
function hasTags(group) {
    if (!group) {
        return false;
    }
    return Object.keys(group).some((key) => key !== '_raw');
}

console.log('Number of files to check: ' + files.length);

async function main() {
    let hasmetadata = false;
    let haserror = false;

    for (const filePath of files) {
        console.log('Checking: ' + sanitize(filePath));
        try {
            const tags = await ExifReader.load(filePath, { expanded: true });
            const found = [];
            if (hasTags(tags.exif)) {
                found.push('Exif');
            }
            if (options.xmp && hasTags(tags.xmp)) {
                found.push('XMP');
            }
            if (options.iptc && hasTags(tags.iptc)) {
                found.push('IPTC');
            }
            if (found.length !== 0) {
                console.log('ERROR: ' + found.join(', ') + ' data found for: ' + sanitize(filePath));
                hasmetadata = true;
            }
        } catch (error) {
            if (error instanceof exifErrors.MetadataMissingError === false) {
                console.log('ERROR: ' + sanitize(error) + ' for: ' + sanitize(filePath));
                haserror = true;
            }
        }
    }

    // exit 1: metadata found, exit 2: file could not be checked
    if (hasmetadata) {
        process.exit(1);
    }
    if (haserror) {
        process.exit(2);
    }
}

main();
