require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/scss'))
app.use(express.static(__dirname + '/images'))

// import all routes
app.use(require ('./routes'))


app.get((req, res) => {
    res.status(404).send("Unknown Request")
})

app.listen(process.env.PORT, () => {
    console.log('\nApp available on http://localhost:3000')
})