const { readFile } = require('fs')
const { authenticate, getToken } = require('../component/authentication')
require('cookie-parser')


function index(req, res){
    try{

        token = getToken(req)

        if(authenticate(token)){
            res.redirect("/dashboard")
            return
        }

        throw error

    }catch(error){
        
        readFile('./html/index.html', 'utf8', (err, html) => {
            if (err) {
                res.status(500).send('sorry, out of order')
            }
            res.send(html)
        })
    }


}

module.exports.index = index;