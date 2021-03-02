require('dotenv').config()
require('cookie-parser')
sass = require('node-sass-middleware')

const cookieParser = require('cookie-parser')
const { response } = require('express')
const express = require('express')
const { readFile } = require('fs')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.static(__dirname + '/css'))
app.use(express.static(__dirname + '/images'))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {

    // check if user is already signed in
    token = req.cookies.alphax_token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, algorithms=['HS256'], function(err, decoded) {

        if(decoded==null || err || decoded.authorization == null ){
            readFile('./index.html', 'utf8', (err, html) => {
                if (err) {
                    res.status(500).send('sorry, out of order')
                }
                res.send(html)
            })
        }else if(decoded.authorization==process.env.USER_TOKEN_SECRET){
            
            readFile('./dashboard.html', 'utf8', (err, html) => {
                if (err) {
                    res.status(500).send('sorry, out of order')
                }
                res.send(html)
            })
        }
    })
})

app.get('/signup', (req, res) => {
    readFile('./signup.html', 'utf8', (err, html) => {
        if (err) {
            res.status(500).send('sorry, out of order')
        }
        res.send(html)
    })

})

app.get('/dashboard', (req, res) => {

    token = req.cookies.alphax_token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, algorithms=['HS256'], function(err, decoded) {

        if(decoded != null  && decoded.authorization==process.env.USER_TOKEN_SECRET){
            readFile('./dashboard.html', 'utf8', (err, html) => {
                if (err) {
                    res.status(500).send('sorry, out of order')
                }
                res.send(html)
            })
        }else if(err){
            readFile('./index.html', 'utf8', (err, html) => {
                if (err) {
                    res.status(500).send('sorry, out of order')
                }
                res.send(html)
            })
        }
    })
})

app.listen(process.env.PORT, () => {
    console.log('\nApp available on http://192.168.254.67:3000')
})