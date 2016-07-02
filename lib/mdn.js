'use strict';
const open = require('open');
const got = require('got');
const cheerio = require('cheerio');

module.exports = function(query) {
  const mdnURI = `https://developer.mozilla.org/en-US/search?q=${ query }`;

  got(mdnURI)
    .then(res => {
      let $ = cheerio.load( res.body );

      let result = $('div.column-5.result-list-item').children().children();

      if (result.length < 1) {
        console.log(`
          You might want to use another query. This one is returning an empty result.
        `);
      }

      let attribs = Object.keys(result).map( (idx) => {
        return result[idx].attribs;
      });

      // filter root and other junk data
      let hrefs = [];

      attribs.forEach( attr => {
        if ( attr ) {
          hrefs.push(attr.href);
        }
      });

      // filter out undefined vals
      hrefs = hrefs.filter( href => href !== undefined );

      // automatically open the files
      hrefs.forEach( href => {
        open( href )
      })

    }).catch(err => {
      throw new Error(err);
    })
};
