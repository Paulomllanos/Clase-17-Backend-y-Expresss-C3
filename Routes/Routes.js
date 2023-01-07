const express = require('express')

const router = express.Router()

router.route('/friends')
    .get((req, res) => res.send(console.log('get')))
    .post((req, res) => res.send(console.log('post')))

    module.exports = router