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
            assert.equal(code, 0);
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
        spawn('node', [path.join(__dirname, '../index.js'), 'test/maker.jpg'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.equal(code, 1);
            expect(out).to.match(/Canon EOS 40D/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('should exit 1 wrong extension', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/wrong.png'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.equal(code, 0);
            expect(out.split('\n')).to.have.length(4);
            expect(out).to.match(/The given image is not a JPEG/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('should exit 0 wrong file', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/404.jpg'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.equal(code, 0);
            expect(out.split('\n')).to.have.length(4);
            expect(out).to.match(/ENOENT: no such file or directory/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });
});
