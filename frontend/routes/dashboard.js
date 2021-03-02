var express = require('express')
var router = express.Router()

/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {

    token = req.cookies.alphax_token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, algorithms=['HS256'], function(err, decoded) {

        if(decoded != null  && decoded.authorization==process.env.USER_TOKEN_SECRET){
            readFile('./dashboard.html', 'utf8', (err, html) => {
                if (err) {
                    res.status(500).send('sorry, out of order')
                }
                res.send(html)
            })
        }else if(err){
            readFile('./index.html', 'utf8', (err, html) => {
                if (err) {
                    res.status(500).send('sorry, out of order')
                }
                res.send(html)
            })
        }
    })
})

module.exports = router;