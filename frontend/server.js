require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

/*  No need to use this HTML files are synched with file reader (fs)
app.use(express.static(__dirname + '/html'));*/
app.use(express.static(__dirname + '/css'))
app.use(express.static(__dirname + '/images'))
app.use(express.static(__dirname + '/node_modules/heic2any/dist/'))

// import all routes
app.use(require ('./routes'))


app.get((req, res) => {
    res.status(404).send("Unknown Request")
})

app.listen(process.env.PORT, () => {
    console.log('\nApp available on http://localhost:4000')
})