const express = require('express')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./configuration/mycontacts_connection')

const app = express()
const port = process.env.PORT || 5000

// connection to MongoDB
connectDB()

// built in middleware - body parser 
app.use(express.json())

// routes
app.use('/api', require('./routes/routes'))

// Error Handler
app.use(errorHandler)

app.listen(port, () => {
    console.log(`- Server running on port ${port}`)
})