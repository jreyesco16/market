require('dotenv').config()
require('cookie-parser')

const cookieParser = require('cookie-parser')
const { response } = require('express')
const express = require('express')
// const { readFile } = require('fs')
const jwt = require('jsonwebtoken')

const app = express()

// import all routes
app.use(require ('./routes'))

app.use(express.static(__dirname + '/css'))
app.use(express.static(__dirname + '/images'))
app.use(express.json())
app.use(cookieParser())

app.get((req, res) => {
    res.status(404).send("Unknown Request")
})

app.listen(process.env.PORT, () => {
    console.log('\nApp available on http://192.168.254.67:3000')
})