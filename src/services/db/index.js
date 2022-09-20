const mongoose = require('mongoose');
const config = require('../../config');
async function connect() {
  console.log(`${config.MONGO_URL}/${config.DB_NAME}`);
  try {
    await mongoose.connect(
      `${config.MONGO_URL}/${config.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log('Connected to MongoDB');
      },
    );
  } catch (err) {
    console.log('Connect to MongoDB fail! ');
  }
}
module.exports = {
  connect,
};
