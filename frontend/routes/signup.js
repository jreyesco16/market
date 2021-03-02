var express = require('express')
var router = express.Router()

/* GET signup page. */
router.get('/signup', function(req, res, next) {

    readFile('./signup.html', 'utf8', (err, html) => {
        if (err) {
            res.status(500).send('sorry, out of order')
        }
        res.send(html)
    })
})

module.exports = router;