const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    const JWT_SECRET= 'abc123'
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: '30d'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENv !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
}

module.exports = generateToken;