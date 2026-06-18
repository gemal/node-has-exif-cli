#!/usr/bin/env node

'use strict';

const path = require('path');
const spawn = require('child_process').spawn;
const expect = require('chai').expect;

describe('index.js', function() {

    this.timeout(8000);

    function run(args) {
        return new Promise(function(resolve) {
            let out = '';
            const proc = spawn('node', [path.join(__dirname, '../index.js')].concat(args), {
                cwd: path.join(__dirname, '../'),
            });
            proc.stdout.on('data', function(data) { out += data; });
            proc.stderr.on('data', function(data) { out += data; });
            proc.on('exit', function(code) { resolve({ code, out }); });
        });
    }

    it('single jpeg with no exif', async function() {
        const { code, out } = await run(['test/none.jpg']);
        expect(code).to.equal(0);
        expect(out).to.match(/Number of files to check: 1/);
        expect(out).to.match(/Checking: test\/none\.jpg/);
    });

    it('single jpeg with exif', async function() {
        const { code, out } = await run(['test/exif.jpg']);
        expect(code).to.equal(1);
        expect(out).to.match(/ERROR: Exif data found for: test\/exif\.jpg/);
    });

    it('single heic with exif but empty', async function() {
        const { code, out } = await run(['test/exifempty.heic']);
        expect(code).to.equal(0);
        expect(out).to.match(/Checking: test\/exifempty\.heic/);
    });

    it('single webp with exif', async function() {
        const { code, out } = await run(['test/exif.webp']);
        expect(code).to.equal(1);
        expect(out).to.match(/ERROR: Exif data found for: test\/exif\.webp/);
    });

    it('single svg which cant be read', async function() {
        const { code, out } = await run(['test/wrong.svg']);
        expect(code).to.equal(1);
        expect(out).to.match(/Invalid image format/);
    });

    it('single non existing file', async function() {
        const { code, out } = await run(['test/404.jpg']);
        expect(code).to.equal(1);
        expect(out).to.match(/ENOENT: no such file or directory/);
    });

    it('multi files with exif', async function() {
        const { code, out } = await run(['test/none.jpg', 'test/exif.jpg', 'test/none.png']);
        expect(code).to.equal(1);
        expect(out).to.match(/Number of files to check: 3/);
        expect(out).to.match(/ERROR: Exif data found for: test\/exif\.jpg/);
    });

    it('multi files with no exif', async function() {
        const { code, out } = await run(['test/none.jpg', 'test/none.png']);
        expect(code).to.equal(0);
        expect(out).to.match(/Number of files to check: 2/);
    });

    it('single jpg with exif but empty', async function() {
        const { code, out } = await run(['test/exifempty.jpg']);
        expect(code).to.equal(0);
        expect(out).to.match(/Number of files to check: 1/);
    });
});
