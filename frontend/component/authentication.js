var jwt = require('jsonwebtoken')

/* function is used to verifies jwt token, returns true if able to decode otherwise false*/
const authenticate = (token) => {

    access = false

    // TESTING
    console.log(token)

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

exports.authenticate = authenticate
exports.getToken = getToken