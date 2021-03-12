const { response } = require('express')
const { readFile } = require('fs')
require('cookie-parser')
const { authenticate }= require('../component/authenticate');
const Vue = require('vue');
const { default: fetch } = require('node-fetch');
const renderer = require('vue-server-renderer').createRenderer()

function dashboard(req, res){


    // VUE INITIALIZATION
    const vue = new Vue({
        data: {
                url: req.url,
                backend_url : '',
                user_data: {}
        },
        // MUST add a template
        template: require('fs').readFileSync('./html/dashboard.html','utf-8')
    })

    if(req.cookies.market_token != undefined){

        token = req.cookies.market_token

        if(authenticate(token)){

            vue._data.backend_url = `${process.env.BACKEND}/dashboard`

            readFile('./html/dashboard.html', 'utf8', (err, html) => {
                if (err) {
                    res.redirect("/")
                }
                res.send(html)
            });
            // render the html file with vue components
            // renderer.renderToString(vue, (err, html) => {
            //     if (err) {
            //         res.status(500).end("Internal Server Error")
            //         return
            //     }

            //     res.end(html)
            // })

        }else{
            res.redirect("/")
        }

    }else{
        res.redirect("/")
    }

}

module.exports.dashboard = dashboard