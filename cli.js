#!/usr/bin/env node
'use strict'
const meow = require('meow');

// importing each website's scraping (getting the hrefs > links)
// moduluarized for clarity and to allow fast refactor if a website change their dom elements or classes
const google = require('./lib/google.js')
const mdn = require('./lib/mdn.js');
const npm = require('./lib/npm.js');
const stack = require('./lib/stack.js');
const github = require('./lib/github.js');
const gist = require('./lib/gist.js');

const cli = meow(`
  Usage: ms <site> <query>
  -------------------------
  Examples:
  > ms google what is a middleware
  > ms mdn coercion
  > ms npm parser
  > ms stack how does javascript generators work
  > ms github webpack-loader
  > ms gist diff algorithm
  `, {
    alias: {
      'v': 'version',
      'h': 'help'
    }
});

let commands = {
  'google': google,
  'mdn': mdn,
  'npm': npm,
  'stack': stack,
  'github': github,
  'gist': gist
};

/**
* {fist argument} > command (identifying website)
* {second argument} > entire {string} query (concatenating all array value)
*/
if (cli.input[0] in commands) {
  commands[cli.input.shift()](cli.input.join(' '));
  console.log('Have an awesome search champion!');
} else {
  console.log(`
  That command is unknown. The available commands are:
    * google
    * mdn
    * npm
    * stack
    * github
    * gist
  `);
  // force automatic exit
  process.exit(1);
}
