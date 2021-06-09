const { readFile } = require('fs')
require('cookie-parser')
const { authenticate }= require('../component/authentication');


function dashboard(req, res){

    if(req.cookies.market_token != undefined){

        token = req.cookies.market_token

        console.log(token)

        if(authenticate(token)){

            readFile('./html/dashboard.html', 'utf8', (err, html) => {
                if (err) {
                    res.redirect("/")
                }
                res.send(html)
            });

        }else{
            res.redirect("/")
        }

    }else{
        res.redirect("/")
    }
}

module.exports.dashboard = dashboard