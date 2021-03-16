var express = require('express')
var router = express.Router()


// modules
const { index } = require('../modules/index')
const { signup } = require('../modules/signup')
const { dashboard } = require('../modules/dashboard')
const { settings } = require('../modules/settings')
const { messages } = require('../modules/messages')
const { community } = require('../modules/community')
const { transactions } = require('../modules/transactions')


require('cookie-parser')

/* GET index page. */
router.get('/', (req, res) => {

    index(req, res)

})

/* GET signup page */
router.get('/signup', (req, res) => {

    signup(req, res)

})

/* GET dashboard page. */
router.get('/dashboard', (req, res) => {

    dashboard(req,res)

})

/* GET profile page. */
router.get('/settings', (req, res) => {

    settings(req,res)

})

/*GET messages page */
router.get('/messages', (req, res) => {

    messages(req, res)
    
})

/* GET community page */
router.get('/community', (req, res) => {

    community(req, res)
    
})

/* GET transactions page */
router.get('/transactions', (req,res) => {

    transactions(req, res)

})

module.exports = router;