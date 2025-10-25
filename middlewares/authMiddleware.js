const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(401).json({ message: "No token provided" });

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        req.user=user;

        next();

    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
}