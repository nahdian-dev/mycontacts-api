const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const header = req.headers.authorization

    if (!header) {
        res.status(401)
        throw new Error('Tidak ada token!')
    }

    if (header.startsWith('Bearer')) {
        var token = header.split(' ')[1]

        jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, decode) => {
            if (err) {
                res.status(401)
                throw new Error('User tidak ter-otorisasi atau token kadaluarsa!')
            } else {
                console.log(decode)
                next()
            }
        })
    }
}

module.exports = validateToken