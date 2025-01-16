const mongoose = require("mongoose");
const connectionString = process.env.CONNECT_STRING;
class Database {
  constructor() {
    this.connect();
  }
  connect(type = "MONGO_DB") {
    const con = mongoose.connect("mongodb://127.0.0.1:27017/Fashion");

    try {
      if (con) {
        console.log("database connected");
      }
    } catch (error) {
      console.log(error);
    }
  }
  static getDatabase() {
    if (!this.database) {
      this.database = new Database();
    }
    return this.database;
  }
}
const db = Database.getDatabase();
module.exports = db;
