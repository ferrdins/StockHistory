const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

const fetchData = async (dbName, collectionName) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.find().toArray();
  client.close();
  return result;
}

module.exports = fetchData;
