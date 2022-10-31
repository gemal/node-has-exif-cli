#!/usr/bin/env node

'use strict';

const assert = require('assert');
const path = require('path');
const spawn = require('child_process').spawn;
const expect = require('chai').expect;

describe('index.js', function() {
    // eslint-disable-next-line no-invalid-this
    this.timeout(8000);

    it('single jpeg with no exif', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/none.jpg'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.strictEqual(code, 0);
            expect(out).to.match(/Number of files to check: 1/);
            expect(out).to.match(/Checking: test\/none\.jpg/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('single jpeg with exif', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/exif.jpg'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.strictEqual(code, 1);
            expect(out).to.match(/ERROR: Exif data found for: test\/exif\.jpg/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('single heic with exif but empty', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/exifempty.heic'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.strictEqual(code, 0);
            expect(out).to.match(/Checking: test\/exifempty\.heic/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('single webp with exif', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/exif.webp'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.strictEqual(code, 1);
            expect(out).to.match(/ERROR: Exif data found for: test\/exif\.webp/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('single svg which cant be read', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/wrong.svg'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.strictEqual(code, 1);
            expect(out).to.match(/Invalid image format/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('single non existing file', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/404.jpg'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.strictEqual(code, 1);
            expect(out).to.match(/ENOENT: no such file or directory/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('multi files with exif', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/none.jpg', 'test/exif.jpg', 'test/none.png'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.strictEqual(code, 1);
            expect(out).to.match(/Number of files to check: 3/);
            expect(out).to.match(/ERROR: Exif data found for: test\/exif\.jpg/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('multi files with no exif', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/none.jpg', 'test/none.png'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.strictEqual(code, 0);
            expect(out).to.match(/Number of files to check: 2/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('single jpg with exif but empty', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/exifempty.jpg'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.strictEqual(code, 0);
            expect(out).to.match(/Number of files to check: 1/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });
});
