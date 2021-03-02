var express = require('express')
var router = express.Router()

const { readFile } = require('fs')

require('cookie-parser')

/* GET index page. */
router.get('/', (req, res) => {


    if(req.cookies == undefined){
        readFile('./html/index.html', 'utf8', (err, html) => {
            if (err) {
                res.status(500).send('sorry, out of order')
            }
            res.send(html)
        })
    }else{

        token = req.cookies.market_token
    }

    // token = req.cookies.market_token


    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, algorithms=['HS256'], function(err, decoded) {

    //     if(decoded==null || err || decoded.authorization == null ){
    //         readFile('./public/index.html', 'utf8', (err, html) => {
    //             if (err) {
    //                 res.status(500).send('sorry, out of order')
    //             }
    //             res.send(html)
    //         })
    //     }else if(decoded.authorization==process.env.USER_TOKEN_SECRET){
            
    //         readFile('./dashboard.html', 'utf8', (err, html) => {
    //             if (err) {
    //                 res.status(500).send('sorry, out of order')
    //             }
    //             res.send(html)
    //         })
    //     }
    // })
})

module.exports = router;