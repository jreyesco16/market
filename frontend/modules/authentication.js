var jwt = require('jsonwebtoken')
const { readFile } = require('fs')

/* function is used to verifies jwt token, returns true if able to decode otherwise false*/
const authenticate = (token) => {

    access = false

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, algorithms=['HS256'], function(err, decoded) {
        if(decoded != null  && decoded.authorization==process.env.USER_TOKEN_SECRET){
            access = true
        }
    })

    return access
}

const getToken = (req) => {
    try{
        return req.cookies.market_token
    }catch(error){
        console.log(error)
        return null
    }
}

const static_render = (html_pass, failed_location, res) => {
    return readFile(html_pass, 'utf8', (err, html) => {
        if (err) {
            res.redirect(failed_location)
        }
        res.send(html)
    })
}

exports.static_render = static_render
exports.authenticate = authenticate
exports.getToken = getToken