const router = require('express').Router()
// const User = require('../models/user')
const vertify = require('./vertivyToken')

router.get('/', vertify, (req, res)=>{
    res.send(req.user)
    // User.findOne({_id: req.user})
})


module.exports = router