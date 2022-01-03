const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

const indexField = async (dbName, collectionName, field) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.createIndex({ [field]: "text" });
  console.log(`Index created: ${result}`);
  client.close();
}

module.exports = indexField;