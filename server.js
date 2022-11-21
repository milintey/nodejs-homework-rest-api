// const mongoose = require('mongoose');
// const app = require('./app');
// const dotenv = require("dotenv");
// dotenv.config();


// // const HOST_DB = "mongodb+srv://milintey:milintey123qwe@cluster0.whv57ja.mongodb.net/?retryWrites=true&w=majority";

// const main = async () => {
//     try {
//       await mongoose.connect(process.env.HOST_DB);
//       console.log("Database connection successful");
      
//       app.listen(3000, () => {
//         console.log("Server running. Use our API on port: 3000")
//       });
//     } catch (error) {
//         console.log("Error:", error.message);
//         process.exit(1);
//     }
// };

// main();

const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  try {
    if (!process.env.HOST_DB) {
      throw new Error("HOST_DB not set!");
    }

    await mongoose.connect(process.env.HOST_DB);
    console.log("connected");

    app.listen(3000, (err) => {
      if (err) throw err;
      console.log(`server is listening on port: 3000`);
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();

