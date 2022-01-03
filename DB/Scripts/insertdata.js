const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

const insertIntoCollection = async (dbName, collectionName, data) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.insertMany(data);
  console.log(result);
  client.close();
}

module.exports = insertIntoCollection;
