import jwt from "jsonwebtoken";

export const verifyAccess = function (roles) {
  return function (req, res, next) {
    try {
      let token = req.headers.authorization;
      if (!token) {
        return res.status(403).send("token is required");
      }
      if (!token.startsWith("Bearer")) {
        return res.status(403).send("token is not valid");
      }
      token = token.slice(7);
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.decoded = decoded;
      if (!roles.includes(decoded.role)) {
        return res.status(403).send("you don't have access");
      }
      console.log(decoded);
      next();
    } catch (error) {
      res.send(error.message);
    }
  };
};
