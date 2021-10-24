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

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).then((userExist) => {
    if (userExist) {
      res.status(400).json({ message: "User already exists" });
    }
  });

  User.create({ name, email, password })
    .then((user) => {
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    })
    .catch((e) => res.status(400).json(e));
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
      res.status(404).json({ message: "User not found" });
    }
  });
};

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = (req, res, next) => {
  User.findById(req.user._id).then((user) => {
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      user.save().then((updatedUser) => {
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser._id),
        });
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = (req, res, next) => {
  User.find({}).then((users) => {
    res.json(users);
  });
};

// @desc Delete user by id
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    if (user) {
      user.remove();
      res.json({ message: "User was been deleted" });
    } else {
      res.status(404);
      res.json({ message: "User not found" });
    }
  });
};

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = (req, res, next) => {
  User.findById(req.params.id)
  .select("-password")
  .then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      res.json({ message: "User not found" });
    }
  }).catch(e => console.error(e))
};

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        user.save().then((updatedUser) => {
          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
          });
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }).catch(e => console.error(e));
};
module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
};
