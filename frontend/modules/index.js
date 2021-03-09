const { readFile } = require('fs')
var jwt  = require('jsonwebtoken')
require('cookie-parser')


function index(req, res){

    if(req.cookies.market_token != undefined){

        token = req.cookies.market_token

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, algorithms=['HS256'], function(err, decoded) {

            if(decoded != null  && decoded.authorization==process.env.USER_TOKEN_SECRET){
                res.redirect("/dashboard")
            }else{
                readFile('./index.html', 'utf8', (err, html) => {
                    if (err) {
                        res.status(500).send('sorry, out of order')
                    }
                    res.send(html)
                })

            }
        })

    }else{
        
        readFile('./index.html', 'utf8', (err, html) => {
            if (err) {
                res.status(500).send('sorry, out of order')
            }
            res.send(html)
        })
    }


}






module.exports.index = index;