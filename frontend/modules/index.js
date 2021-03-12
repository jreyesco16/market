const { readFile } = require('fs')
const { authenticate } = require('../component/authenticate')
require('cookie-parser')


function index(req, res){

    if(req.cookies.market_token != undefined){

        token = req.cookies.market_token

        if(authenticate(token)){
            res.redirect("/dashboard")
        }else{
            readFile('./html/index.html', 'utf8', (err, html) => {
                if (err) {
                    res.status(500).send('sorry, out of order')
                }
                res.send(html)
            })
        }

    }else{
        
        readFile('./html/index.html', 'utf8', (err, html) => {
            if (err) {
                res.status(500).send('sorry, out of order')
            }
            res.send(html)
        })
    }


}

module.exports.index = index;