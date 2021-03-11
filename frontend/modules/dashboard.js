const { response } = require('express')
const { readFile } = require('fs')
const fetch = require("node-fetch");
var jwt = require('jsonwebtoken')
require('cookie-parser')
const { authenticate }= require('../component/authenticate')


function dashboard(req, res){

    if(req.cookies.market_token != undefined){

        token = req.cookies.market_token

        if(authenticate(token)){

            dashabord_data = getUserDashboard(token)

            console.log(dashabord_data)

            readFile('./html/dashboard.html', 'utf8', (err, html) => {
                if (err) {
                    res.redirect("/")
                }
                res.send(html)
            })

        }else{
            res.redirect("/")
        }

    }else{
        res.redirect("/")
    }

}

function getUserDashboard(token){

    dash_data = {}

    // get all the user data for the 
    fetch(process.env.BACKEND + "/dashboard",
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                token: token
            })

        }
    ).then(response => response.json())
    .then(data => 
        {
            console.log(data)
        }
    )

}



module.exports.dashboard = dashboard