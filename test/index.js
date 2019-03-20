#!/usr/bin/env node

'use strict';

const assert = require('assert');
const path = require('path');
const spawn = require('child_process').spawn;
const expect = require('chai').expect;

describe('index.js', function() {
    // eslint-disable-next-line no-invalid-this
    this.timeout(8000);

    it('should exit 1 having exif problems', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), 'test/img1/img.jpg'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.equal(code, 1);
            expect(out).to.match(/Error found in:.*?style\.css/);
            expect(out).to.match(/Full path not found.*?\.\.\/img\/404\.png/);
            expect(out).to.match(/Path in CSS file: \.\.\/img\/404\.png\?v=5/);
            expect(out).to.match(/Original path in CSS file: \.\.\/img\/404\.png/);
            done();
        }).stdout.on('data', function(data) {
            console.log(data.toString());
            out += data;
        });
    });
});
