const jwt = require("jsonwebtoken");

const verifyAccess = function (roles) {
  return function (req, res, next) {
    try {
      let token = req.headers.authorization;
      if (!token) {
        return res.status(403).send("Token is required");
      }
      if (!token.startsWith("Bearer")) {
        return res.status(403).send("Token is not valid");
      }
      token = token.slice(7);
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.decoded = decoded;
      if (!roles.includes(decoded.role)) {
        return res.status(403).send("You don't have access");
      }
      console.log(decoded);
      next();
    } catch (error) {
      res.send(error.message);
    }
  };
};
module.exports = verifyAccess;
