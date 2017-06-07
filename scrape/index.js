const cheerio = require('cheerio')
const http = require('http')


/**
 * Takes a standard http function
 */
const GET = (options) => {
  return new Promise((resolve, reject) => {
    let chunks = []
    http.get(options, (res) => {
      res.on('data', (chunk) => {
        chunks.push(chunk);
      }).on('end', () => {
        resolve(Buffer.concat(chunks).toString())
      })
    }).on('error', (e) => {
      reject(e)
    })
  })
} 

module.exports.GET = GET

GET({
  'www.google.com'
}).then(page => {
  const $ = cheerio.load(page)
})
