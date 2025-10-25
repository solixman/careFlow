const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    let user = req.user
    if (user.role !== 'doctor') {
        return res.status(401).json({
            error: 'only a doctor can do this'
        });
    }

    next()
}