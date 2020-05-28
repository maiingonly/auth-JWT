const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// VALIDATION
const {registerValid, loginValid} = require('../validation')


router.post('/register',async (req,res) => {

    //validate the data beforew a user
    const {error} = registerValid(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //checking if the user already in database
    const emalilExist = await User.findOne({email: req.body.email})
    if(emalilExist) return res.status(400).send('Email already exist!')

    // Hash paswords
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req,res) => {
    const {error} = loginValid(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    // checking if the user not found
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email not found')
    // password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

})

module.exports = router
