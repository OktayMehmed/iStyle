const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('8888', 10),
    isAdmin: true
  },
  {
    name: 'John Paul',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('8888', 10)
  },
  {
    name: 'Mary Paul',
    email: 'mary@gmail.com',
    password: bcrypt.hashSync('8888', 10)
  }
];

module.exports = users;