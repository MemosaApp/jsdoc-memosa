#! /usr/bin/env node

var glob = require('glob');
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');
var program = require('commander');

program.arguments('<files>')
  .option('-i, --ignore <ignore...>', 'Files to ignore')
  .option('-c, --config <config>', 'Configuration file for jsdoc')
  .option('-v, --verbose', 'Print out all files we look at and their result')
  .action(function(files) {
    var options = {};

    if (program.ignore) {
      options.ignore = program.ignore;
    }

    var globFiles = glob.sync(files, options);

    if (program.verbose) {
      console.log('> Checking the following files:');
      globFiles.forEach(f => console.log('>>> ' + f));
      console.log('');

      console.log('> Parsing:');
    }

    globFiles.forEach(f => {
      // Don't write the file if it would be empty
      exec(
        './node_modules/jsdoc-to-markdown/bin/cli.js ' +
        f + (program.config ? (' -c ' + program.config + ' ') : ''),
        function (error, stdout, stderr) {
          if (error || stderr) {
            console.error(error || stderr);
          }

          if (stdout.trim() !== '') {
            fs.writeFile(f.replace('.js', '.md'), stdout, function callback() {
              program.verbose ? console.log('>> ' + f) : null;
              console.log('>>> Generated docs for ' + f);
            });
          } else if (program.verbose) {
            console.log('>> ' + f);
            console.log('>>> No docs generated');
          }
        }
      );
    });
  })
  .parse(process.argv);
