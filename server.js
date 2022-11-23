const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

async function main() {
  try {
    await mongoose.connect(process.env.HOST_DB);
    console.log('connected MongoDB');

    app.listen(3000, err => {
      if (err) throw err;
      console.log(`server is listening on port: 3000`);
    });
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
