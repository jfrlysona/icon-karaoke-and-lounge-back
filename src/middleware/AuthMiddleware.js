const jwt = require("jsonwebtoken");

const verifyAccess = (roles) => {
  return (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (!token) {
        return res.status(403).send("Token is required");
      }
      if (!token.startsWith("Bearer ")) {
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
      if (error.name === "TokenExpiredError") {
        return res.status(401).send("Token expired");
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).send("Invalid token");
      } else {
        return res.status(500).send("Internal server error");
      }
    }
  };
};

module.exports = verifyAccess;
