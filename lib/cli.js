var program = require('commander');

program
  .version(require('../package.json').version)
  .usage('<file ...> [options]')
  .parse(process.argv);


var hasExifCli = require('./has-exif-cli');

// Get all the files.
var files = program.args;

// Parse and print each file.
files.forEach(hasExifCli.parseFile);
