require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()
app.use(cookieParser())

app.use(express.static(path.join(__dirname,'/css')))
app.use(express.static(path.join(__dirname,'/images')))
app.use(express.static(path.join(__dirname, '/node_modules/heic2any/dist/')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js'))) // redirect bootstrap JS
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css'))) // redirect CSS bootstr

// import all routes
app.use(require('./routes'))

app.get((req, res) => {
  res.status(404).send('Unknown Request')
})

app.listen(process.env.PORT, () => {
  console.log('\nApp available on http://localhost:3000')
})
