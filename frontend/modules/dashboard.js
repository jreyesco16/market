const { Http2ServerResponse, Http2ServerRequest } = require('http2')
require('cookie-parser')
const { authenticate, getToken, static_render } = require('../component/authentication')

function dashboard(req, res){
    try {
        token = getToken(req)

        if(authenticate(token)){
            static_render('./html/dashboard.html', "/", res)
            return
        }
        throw error

    }catch(error){
        res.redirect("/")
    }
}

module.exports.dashboard = dashboard