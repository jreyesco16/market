var express = require('express')
var router = express.Router()


// modules
const { index } = require('../modules/index')
const { signup } = require('../modules/signup')
const { dashboard } = require('../modules/dashboard')
const { messages } = require('../modules/messages')

require('cookie-parser')

/* GET index page. */
router.get('/', (req, res) => {

    index(req, res)

})


/* GET signup page. */
router.get('/signup', (req, res) => {

    signup(req,res)

})


/* GET dashboard page. */
router.get('/dashboard', (req, res) => {

    dashboard(req,res)

})

/*GET messages page */
router.get('/messages/', (req, res) => {

    messages(req, res)
    
})

module.exports = router;