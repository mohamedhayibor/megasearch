'use strict'
const open = require('open');
const got = require('got');
const cheerio = require('cheerio');

module.exports = function(query) {
  let uri = `https://www.npmjs.com/search?q=${ query }`;

  got(uri)
    .then(res => {
      let $ = cheerio.load( res.body );
      let result = $('a.name');

      if (result.length < 1) {
        console.log(`
    You might want to use another query. This one is returning an empty result.
        `);
      }

      let attribs = Object.keys(result).map( (idx) => {
        return result[idx].attribs;
      });

      let hrefs = [];

      // filter out junk data then push to hrefs
      attribs.forEach( attr => {
        if ( attr ) {
          hrefs.push(attr.href);
        }
      });

      // automatically open the files
      hrefs.forEach( href => {
        open(`https://www.npmjs.com${ href }`);
      })
    }).catch(err => {
      throw new Error(err);
    })
}
