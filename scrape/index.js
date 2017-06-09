const cheerio = require('cheerio');
const http = require('http');


/**
 * Takes a standard http function
 */
const GET = (options) => {
		return new Promise((resolve, reject) => {
				let chunks = [];
				http.get(options, (res) => {
						res.on('data', (chunk) => {
								chunks.push(chunk);
						}).on('end', () => {
                let page = Buffer.concat(chunks).toString();
								resolve(page);
						});
				}).on('error', (e) => {
						reject(e);
				});
		});
} ;

module.exports.GET = GET;


const seed = require('./seed.json');


GET(seed).then((page) => {
    let $ = cheerio.load(page);
		console.log($('table a').text());
});
