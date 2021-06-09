const { readFile } = require('fs')
const { authenticate } = require('../component/authentication')
require('cookie-parser')


function settings(req, res){
    if(req.cookies.market_token != undefined){

        token = req.cookies.market_token

        if(authenticate(token)){

            readFile('./html/settings.html', 'utf8', (err, html) => {
                if (err) {
                    res.redirect("/dashboard")
                }
                res.send(html)
            });

        }else{
            res.redirect("/dashboard")
        }

    }else{
        res.redirect("/dashboard")
    }
}

module.exports.settings = settings