const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

let dbConnection;

const DBConn = {
  connect: async (dbName) => {
    await client.connect();
    dbConnection = client.db(dbName);
    console.log('Db connected successfully!');
  },
  getConnection: () => {
    return dbConnection;
  }
}

module.exports = DBConn;