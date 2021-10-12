const User = require("../model/User");
const generateToken = require("../utils/jwt");

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => Promise.all([user, user.matchPassword(password)]))
    .then(([user, match]) => {
      if (user && match) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    })
    .catch(() =>
      res.status(401).json({ message: "Invalid email or password" })
    );
};

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = (req, res, next) => {
  User.findById(req.user._id).then((user) => {
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
};
module.exports = { authUser, getUserProfile };
