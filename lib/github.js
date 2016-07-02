'use strict'
const open = require('open');
const got = require('got');
const cheerio = require('cheerio');

module.exports = function(query) {
  let githubURI = `https://github.com/search?q=${ query }&ref=opensearch`;

  got(githubURI)
  .then(res => {
    let $ = cheerio.load( res.body );

    let result = $('h3.repo-list-name').children();

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
      open(`https://github.com${ href }`); // other variable
    })

  }).catch(err => {
    throw new Error(err);
  })
}
