const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
    const token = req.cookies.token;
    console.log("cookie token: ", token);

    if (!token) {
        // return res.status(401).json({ message: 'No token provided' });
        return res.redirect('/');
    }

    try {
        // Verify and decode the token
        const user = jwt.verify(token, 'amal');
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie('token');
        return res.redirect('/');
    }
    
}

module.exports = authenticateUser;
