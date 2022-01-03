const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const dbName = "stockhistory";

const dropDatabase = async () => {
  await client.connect();
  console.log('Server connected');
  const db = client.db(dbName);
  await db.dropDatabase()
  console.log(`Database ${dbName} dropped.`);
  client.close();
}

dropDatabase();