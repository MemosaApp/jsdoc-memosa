#! /usr/bin/env node

var glob = require('glob');
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');
var program = require('commander');

program.arguments('<files>')
  .option('-i, --ignore <ignore>', 'Files to ignore')
  .option('-c, --config <config>', 'Configuration file for jsdoc')
  .action(function(files) {
    var options = {};

    if (program.ignore) {
      options.ignore = program.ignore;
    }

    var globFiles = glob.sync(files, options);

    globFiles.forEach(f => {
      // Don't write the file if it would be empty
      exec(
        './node_modules/jsdoc-to-markdown/bin.js ' +
        f + (program.config ? (' -c ' + program.config + ' ') : ''),
        function (error, stdout, stderr) {
          if (stdout.trim() !== '') {
            fs.writeFile(f.replace('.js', '.md'), stdout, function callback() {
              console.log('>>> Generated docs for ' + f);
            });
          }
        }
      );
    });

  })
  .parse(process.argv);
