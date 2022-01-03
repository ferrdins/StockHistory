const insertIntoCollection = require('./insertdata');
const indexField = require('./indexField');
const dbName = "stockhistory";
const collectionName = "symbols";
const field = "symbol";

const symbols = [{
  symbol: 'AAPL',
  companyName: 'Apple Inc.'
},
{
  symbol: 'AMC',
  companyName: 'AMC Entertainment Holdings, Inc.'
},
{
  symbol: 'ARKK',
  companyName: 'ARK Innovation ETF'
},
{
  symbol: 'BB',
  companyName: 'BlackBerry Limited'
},
{
  symbol: 'BDRY',
  companyName: 'Breakwave Dry Bulk Shipping ETF'
},
{
  symbol: 'BILI',
  companyName: 'Bilibili Inc.'
},
{
  symbol: 'CHWY',
  companyName: 'Chewy, Inc.'
},
{
  symbol: 'DIA',
  companyName: 'SPDR Dow Jones Industrial Average ETF Trust'
},
{
  symbol: 'FCX',
  companyName: 'Freeport-McMoRan Inc.'
},
{
  symbol: 'GME',
  companyName: 'GameStop Corp.'
},
{
  symbol: 'IWM',
  companyName: 'iShares Russell 2000 ETF'
},
{
  symbol: 'MSFT',
  companyName: 'Microsoft Corporation'
},
{
  symbol: 'QQQ',
  companyName: 'Invesco QQQ Trust'
},
{
  symbol: 'SPY',
  companyName: 'SPDR S&P 500 ETF Trust'
}];

insertIntoCollection(dbName, collectionName, symbols);
indexField(dbName, collectionName, field);
