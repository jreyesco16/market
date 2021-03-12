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

            let dashboard = {}
            getUserDashboard(token).then(data => {
                dashboard = data
            })

            console.log(dashboard)

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

    return new Promise((resolve, reject) => {



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
        ).then(response => {
            return response.json()
        })
        .then(result => 
            {
                let dashboard=result['dashboard']
                resolve(dashboard)
            }
        )
    })
}



module.exports.dashboard = dashboard