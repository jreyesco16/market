const { readFile } = require('fs')
var jwt = require('jsonwebtoken')
require('cookie-parser')

function dashboard(req, res){


    // console.log("Hello")

    if(req.cookies.market_token != undefined){

        token = req.cookies.market_token

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, algorithms=['HS256'], function(err, decoded) {


            if(decoded != null  && decoded.authorization==process.env.USER_TOKEN_SECRET){

                readFile('./html/dashboard.html', 'utf8', (err, html) => {
                    if (err) {
                        res.redirect("/")
                    }
                    res.send(html)
                })
            }else{
                res.redirect("/")
            }
        })

    }else{

        res.redirect("/")

    }

    

}



module.exports.dashboard = dashboard