#!/usr/bin/env node

'use strict';

const assert = require('assert');
const path = require('path');
const spawn = require('child_process').spawn;
const expect = require('chai').expect;

describe('index.js', function() {
    // eslint-disable-next-line no-invalid-this
    this.timeout(8000);

    it('should exit 0 no problems', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/none.jpg'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.strictEqual(code, 0);
            expect(out.split('\n')).to.have.length(3);
            expect(out).to.match(/Number of files to check: 1/);
            expect(out).to.match(/Checking: test\/none\.jpg/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('should exit 1 has exif', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/exif.jpg'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.strictEqual(code, 1);
            expect(out).to.match(/ERROR: Exif data found: test\/exif\.jpg/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('should exit 1 has error', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/error.heic'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.strictEqual(code, 1);
            expect(out).to.match(/ERROR: No exif data found: test\/error\.heic/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('should exit 1 wrong extension', function(done) {
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

    it('should exit 1 wrong file', function(done) {
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

    it('should exit 1 multi has exif', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/none.jpg', 'test/exif.jpg', 'test/none.png'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.strictEqual(code, 1);
            expect(out).to.match(/Number of files to check: 3/);
            expect(out).to.match(/ERROR: Exif data found: test\/exif\.jpg/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('should exit 0 multi no exif', function(done) {
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
});
