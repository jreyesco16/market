const { readFile } = require('fs')
const { authenticate , getToken, static_render} = require('../component/authentication')
require('cookie-parser')


function settings(req, res){
    try{
        token = getToken(req)

        if(authenticate(token)){
            static_render('./html/settings.html', "/dashboard", res)
            return 
        }
        throw error

    }catch(error){
        res.redirect("/dashboard")
    }
}

module.exports.settings = settings