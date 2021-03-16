const { readFile } = require('fs')
require('cookie-parser')


function index(req, res){

    readFile('./html/index.html', 'utf8', (err, html) => {
        if (err) {
            res.status(500).send('sorry, out of order')
        }
        res.send(html)
    })
}

module.exports.index = index;