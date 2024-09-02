const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        req.token = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "No valid Token!!" });
    }
}

module.exports = { verifyToken, SECRET };
