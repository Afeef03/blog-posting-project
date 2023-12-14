const jwt = require('jsonwebtoken');
const User = require('../model/user')

const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        const verified = await jwt.verify(token, process.env.JWT);

        // Fetch the full user object from the database using the user ID
        const user = await User.findById(verified.userId);

        if (!user) {
            return res.status(403).send("Access Denied");
        }

        // Attach the full user object to the request
        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const isAdmin = (req, res, next) => {
    const user = req.user;

    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden. Only admin users can perform this action.' });
    }

    next();
};


module.exports = { verifyToken , isAdmin };