const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// register a new user
async function userRegister (req, res) {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ 
            username: username,
            password: hashedPassword
        });

        res.json({ message: 'User register successfully', user: newUser });

    } catch (error) {
        console.error(error, 'Error registering user');
    }
}

// handle user login requests
async function userLogIn (req, res) {
    try {
        // Extract username & password from the request body
        const { username, password } = req.body;

        // find a user in the db based on the provide username
        const user = await User.findOne({ where: { username } });

        // If no user is found, return error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provide password matches the hashed password in the db
        const isPassValid = await bcrypt.compare(password, user.password);

        // If password match, generate a JSON Web Token (JWT) for authentication
        if (!isPassValid) {
            return res.status(401).json({ message: "Invaild credentials" });
        }

        // Generate a JWT with the user ID payload, set expiration to 1 hour
        const token = jwt.sign({ userId: user.id }, 'amal', {expiresIn: '1h'});
        console.log(`token: ${token}`);
        

        res.cookie("token", token , {
            httpOnly: true,
        });
    
        res.redirect(`/welcome`);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
}

async function nextPage (req, res) {
    res.send('Hello this is new page');
}



module.exports = { userRegister, userLogIn, nextPage };

