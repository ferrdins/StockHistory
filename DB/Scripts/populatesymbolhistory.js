const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const fetchData = require('./fetchdata');
const insertIntoCollection = require('./insertdata')
const dbName = "stockhistory";
const symbolCollection = "symbols";
const symbolHistoryCollection = "symbolhistory";

const root = path.resolve('Data');
fs.readdir(root, async (err, files) => {
  if (err) throw err;
  const symbols = await fetchData(dbName, symbolCollection);
  for (const file of files) {
    const filePath = path.resolve('Data', file);
    let rows = [];  
    const stat = fs.statSync(filePath);
    if (!stat.isDirectory()) {
      const fileName = path.basename(file, path.extname(file));
      const symbolId = symbols.find(symbolInfo => symbolInfo.symbol === fileName)._id;
      const symbolType = {
        symbolId
      };
      console.log(`Importing symbol history for ${fileName}.`)
      const data = await csv().fromFile(filePath);
      data.forEach(item => {
        const row = { ...item, ...symbolType };
        rows.push(row);
      });
      await insertIntoCollection(dbName, symbolHistoryCollection, rows);
      console.log(`Importing symbol history for ${fileName} completed. Total rows: ${rows.length}`);
    }
  }
});