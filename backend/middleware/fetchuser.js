const jwt = require("jsonwebtoken");

const JWT_SECRET = "helloU$er";

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header("auth-token");
    if(!token ){
        res.status(401).send({error: "Not a valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next(); // calling the function which is after the fetchuser where it is used.
        
    } catch (error) {
        res.status(401).send({error: "Not a valid token"});
    }
}

module.exports = fetchuser;