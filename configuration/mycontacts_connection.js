const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

const connectDB = asyncHandler(async () => {
    try {
        const connectDB = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('- DB Connected to database: ', connectDB.connection.name)
    } catch (error) {
        console.error('- Connect DB Error: ', error)
        process.exit(1)
    }
})

module.exports = connectDB