import { expect } from 'chai';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(__dirname, '..', 'index.js');

// control characters built at runtime so this source file stays plain ASCII
const ESC = String.fromCharCode(27);
const range = (from, to) => String.fromCharCode(from) + '-' + String.fromCharCode(to);
const controlChars = new RegExp('[' + range(0, 8) + range(11, 12) + range(14, 31) + range(127, 159) + ']');

function run(args) {
    return new Promise(function(resolve) {
        let out = '';
        const proc = spawn('node', [indexPath, ...args]);
        proc.stdout.on('data', (data) => { out += data.toString(); });
        proc.on('exit', (code) => resolve({ code, out }));
    });
}

describe('output sanitizing', function() {
    this.timeout(8000);

    // a non-existent file name carrying an ANSI escape: the CLI echoes the name
    // (in "Checking:" and the error line), so its output must stay control-char free
    const evil = 'evil' + ESC + '[31mred.jpg';

    it('should not emit control characters from a malicious file name', async function() {
        const { code, out } = await run([evil]);
        expect(code).to.equal(1);
        expect(out).to.not.match(controlChars);
    });

    it('should keep the readable part of the sanitized file name', async function() {
        const { out } = await run([evil]);
        expect(out).to.match(/Checking: evil\[31mred\.jpg/);
    });
});
