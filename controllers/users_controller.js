const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const Users = require('../models/users_model')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

// @desc GET all users
// @route GET - /users
// @access public
const all_users = asyncHandler(async (req, res) => {
    const all_users = await Users.find()

    res.status(200).json({ all_users })
})

// @desc POST register user
// @route POST - /users/register
// @access public
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    const schema = Joi.object({
        username: Joi.string().min(4).max(16).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(16).required(),
    })

    const { error, value } = await schema.validate(req.body)

    if (error) {
        res.status(400)
        throw new Error(error)
    }

    const alreadyEmail = await Users.findOne({ email })

    if (alreadyEmail) {
        res.status(400)
        throw new Error('Email sudah tersedia!')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const createUser = await Users.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(200).json({
            message: "Berhasil membuat akun!",
            body: createUser
        })
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }

})

// @desc POST login
// @route POST - /users/login
// @access public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Semua fields harus tersedia!')
    }

    const user = await Users.findOne({ email })
    const compare = await bcrypt.compare(password, user.password)

    if (compare) {
        const accessToken = await jwt.sign({
            user: {
                username: user.name,
                email: user.email,
                id: user._id
            }
        },
            process.env.SECRET_KEY_TOKEN,
            { expiresIn: '1h' }
        )

        res.status(200).json({ accessToken: accessToken })
    } else {
        res.status(400)
        throw new Error('Password tidak sesuai!')
    }
})

// @desc GET current user
// @route GET - /users/current
// @access private
const current = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Current User' })
})

module.exports = { register, login, current, all_users }