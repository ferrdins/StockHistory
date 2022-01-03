const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const dbName = "stockhistory";
const collections = ['symbols', 'symbolhistory'];

const createCollections = async () => {
  await client.connect();
  console.log('Server connected');
  const db = client.db(dbName);
  await db.createCollection('symbols');
  await db.createCollection('symbolhistory');
  client.close();
}

createCollections();