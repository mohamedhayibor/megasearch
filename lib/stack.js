'use strict'
const open = require('open');
const got = require('got');
const cheerio = require('cheerio');

module.exports = function(query) {
  let stackOverflowURI = `http://stackoverflow.com/search?q=${ query }`;

  got(stackOverflowURI)
    .then(res => {
      let $ = cheerio.load( res.body );

      let result = $('div.result-link').children().children(); // local variable

      if (result.length < 1) {
        console.log(`
          You might want to use another query. This one is returning an empty result.
        `);
      }

      let attribs = Object.keys(result).map( (idx) => {
        return result[idx].attribs;
      })

      // filter out root, prev, next nodes and other junk data
      let hrefs = [];

      attribs.forEach( attr => {
        if ( attr ) {
          hrefs.push(attr.href);
        }
      });

      // automatically open the files
      hrefs.forEach( href => {
        open(`https://stackoverflow.com${ href }`) // local var
      })
    }).catch(err => {
      throw new Error(err);
    })
}
