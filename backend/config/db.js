const mongoose = require('mongoose');

const db = () => {
  mongoose.connect(process.env.MONGO_URI)
 .then(() =>  console.log('DB is connected'))
 .catch((e) => console.error(`Error: ${e.message}`))
}

module.exports = db;