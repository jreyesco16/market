var jwt = require('jsonwebtoken')

/* function is used to verifies jwt token, returns true if able to decode otherwise false*/
function authenticate(token){

    access = false

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, algorithms=['HS256'], function(err, decoded) {
        if(decoded != null  && decoded.authorization==process.env.USER_TOKEN_SECRET){
            access = true
        }
    })

    return access
}

module.exports.authenticate = authenticate