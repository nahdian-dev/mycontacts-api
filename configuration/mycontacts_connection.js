const mongoose = require('mongoose')

let db = null;

const connectDB = async () => {
    if (db) return db

    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000, // Waktu tunggu koneksi dalam milidetik
            socketTimeoutMS: 30000, // Waktu tunggu soket dalam milidetik
        }

        const connectDB = await mongoose.connect(process.env.CONNECTION_STRING, options)
        db = connectDB
        console.log('- DB Connected to database: ', connectDB.connection.name)

        return db
    } catch (error) {
        console.error('- Connect DB Error: ', error)
        process.exit(1)
    }
}

module.exports = connectDB