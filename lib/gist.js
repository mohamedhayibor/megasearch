'use strict'
const open = require('open');
const got = require('got');
const cheerio = require('cheerio');

module.exports = function (query) {
  let gistURI = `https://gist.github.com/search?q=${ query }`;

  got(gistURI)
  .then(res => {
    let $ = cheerio.load( res.body );

    let result = $('strong.css-truncate-target').parent();

    if (result.length < 1) {
      console.log(`
        You might want to use another query. This one is returning an empty result.
      `);
    }

    let attribs = Object.keys(result).map( (idx) => {
      return result[idx].attribs;
    })

    let hrefs = [];

    attribs.forEach( attr => {
      // filter out junk data
      if ( attr ) {
        hrefs.push(attr.href);
      }
    });

    hrefs.forEach( href => {
      open(`https://gist.github.com${ href }`)
    })

  }).catch(err => {
    throw new Error(err);
  })
}
