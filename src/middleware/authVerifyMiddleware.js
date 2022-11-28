const jwt = require('jsonwebtoken')
require("dotenv").config({ path: 'config.env' });
const secret = process.env.SECRET

module.exports = (req, res, next) => {
    let Token = req.headers['token']
    jwt.verify(Token, secret, (error, decoded) => {
        if (error) {
            res.status(401).json({ status: "Unauthorized" });
        }
        else {
            //Get User Name from decoded Token and add with req headers
            let userName = decoded['data']['userName'];
            req.headers.userName = userName;
            next();
        }
    })
}