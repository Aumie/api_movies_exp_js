const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if(!token)
        return res.status(401).send('Access denied. No token provided.');// no authenticaton credential to access resource's error
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));//return the payload
        req.user = decoded;//so we can access like req.user._id
        next();
    }
    catch(ex){
        res.status(400).send('Invalid token.');
    }
}

//module.exports = auth