var express = require('express')
var router = express.Router()

const { index } = require('../modules/index')
const { signup } = require('../modules/signup')
const { dashboard } = require('../modules/dashboard')
const { settings } = require('../modules/settings')
const { messages } = require('../modules/messages')
const { community } = require('../modules/community')
const { transactions } = require('../modules/transactions')

require('cookie-parser')

router.get('/', (req, res) => {
    index(req, res)
})

router.get('/signup', (req, res) => {
    signup(req, res)
})

router.get('/dashboard', (req, res) => {
    dashboard(req,res)
})

router.get('/settings', (req, res) => {
    settings(req,res)
})

router.get('/messages', (req, res) => {
    messages(req, res)
})

router.get('/community', (req, res) => {
    community(req, res)
})

router.get('/transactions', (req,res) => {
    transactions(req, res)
})

module.exports = router;