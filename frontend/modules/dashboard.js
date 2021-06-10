const { readFile } = require('fs')
require('cookie-parser')
const { authenticate, getToken } = require('../component/authentication')


function dashboard(req, res){

    try {

        token = getToken(req)

        console.log(token)

        if(authenticate(token)){
            readFile('./html/dashboard.html', 'utf8', (err, html) => {
                if (err) {
                    res.status(500).send('sorry, out of order')
                }
                res.send(html)
            })
            return
        }
        throw error

    }catch(error){
        res.redirect("/")
    }
}

module.exports.dashboard = dashboard