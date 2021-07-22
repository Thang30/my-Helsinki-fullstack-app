require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let MY_HELSINKI_API_PLACES = process.env.MY_HELSINKI_API_PLACES;

module.exports = {
  MONGODB_URI,
  PORT,
  MY_HELSINKI_API_PLACES,
};
