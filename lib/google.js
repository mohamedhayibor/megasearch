'use strict'
const open = require('open');
const got = require('got');
const cheerio = require('cheerio');

module.exports = function(query) {
  let googleURI = `https://www.google.com/search?q=${ query }`;

  got(googleURI)
  .then(res => {
    let $ = cheerio.load( res.body );

    let result = $('h3.r').children();

    if (result.length < 1) {
      console.log(`
        You might want to use another query. This one is returning an empty result.
      `);
    }

    let attribs = Object.keys(result).map( (idx) => {
      return result[idx].attribs;
    })

    // filter root and other junk data
    let hrefs = [];

    attribs.forEach( attr => {
      if ( attr ) {
        // deleting junk (tracking stuff) > faster page load, less tracking bs
        let junkTracking = attr.href.indexOf('&');
        hrefs.push( (attr.href).slice(7, junkTracking) );
      }
    });

    // automatically open the files
    hrefs.forEach( href => {
      open(href);
    })

  }).catch(err => {
    throw new Error(err);
  })
}
