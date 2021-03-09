const { readFile } = require('fs')


function signup(req,res){

    readFile('./signup.html', 'utf8', (err, html) => {
        if (err) {
            res.status(500).send('sorry, out of order')
        }
        res.send(html)
    })

}


module.exports.signup = signup