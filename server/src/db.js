const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;

mongoose
  .connect(
    // "mongodb+srv://manasranjan:zXsSCBwNaHvwFO3i@cluster0-hwlgh.mongodb.net/apne-facebook-v-2?retryWrites=true&w=majority",
    "mongodb://127.0.0.1:27017/facebook?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err.message));
