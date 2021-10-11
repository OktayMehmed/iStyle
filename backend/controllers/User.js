const User = require("../model/User");

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
          token: null,
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    }).catch(() => res.status(401).json({ message: "Invalid email or password" }))
};
module.exports = { authUser };
