const jwt = require("jsonwebtoken");
const User = require("../model/User");

const protect = (req, res, next) => {
  let token;

  const headerValue = req.headers.authorization;
  if (headerValue && headerValue.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      User.findById(decoded.id)
        .select("-password")
        .then((id) => {
          req.user = id;
          next();
        });
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized and no token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized and no token");
  }
};

const isAdmin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).json({message: 'Not authorized as an admin'})
  }
}

module.exports = { protect, isAdmin };
