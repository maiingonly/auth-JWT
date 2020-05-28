const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require(('mongoose'))
// Import Routes
const authRoute = require('./routes/auth')
const postsRoute= require('./routes/posts')

dotenv.config()

//connect to DB
mongoose.connect(process.env.connDB, {useNewUrlParser: true, useUnifiedTopology: true},
 () => console.log('connected to db')
)

//Middleware
app.use(express.json())

// Routes middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postsRoute)

app.listen(2000, ()=>console.log('Magic happen at http://localhost:2000/api'))