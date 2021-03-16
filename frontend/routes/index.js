var express = require('express')
var router = express.Router()

// modules
const { index } = require('../modules/index')

require('cookie-parser')

/* GET index page. */
router.get('/', (req, res) => {

    index(req, res)

})

module.exports = router;