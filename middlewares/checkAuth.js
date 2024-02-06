const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userData = decodedToken;
        next();
    } catch (err) {
        return res
            .status(401)
            .json({ message: 'Invalid or expired token provided', error: err });
    }
};

module.exports = { checkAuth };
