const express = require('express');
const router = express.Router();
const DBConn = require('../../data/connect');
const ObjectId = require('mongodb').ObjectId;

router.get('/:symbolId/list', async (req, res) => {
  const pageIndex = parseInt(req.query.pno);
  const pageSize = parseInt(req.query.psz);
  const startIndex = (pageIndex - 1) * pageSize;
  let startDate = new Date(req.query.sdt);
  startDate.setDate(startDate.getDate() - 1);
  startDate = startDate.toISOString();
  let endDate = new Date(req.query.edt).toISOString();  
  const db = DBConn.getConnection();
  db
  .collection('symbolhistory')
  .find({
    symbolId: ObjectId(req.params.symbolId),
    Date: {
      "$gt": startDate,
      "$lte": endDate
    }
  })
  .limit(pageSize)
  .skip(startIndex)
  .sort({ _id: -1 })
  .toArray((err, data) => {
    if(err) {
      res.status(400).send('Server error.');
    } else {
      res.json(data)
    }
  });
});

router.get('/:symbolId/count', async (req, res) => {
  let startDate = new Date(req.query.sdt);
  startDate.setDate(startDate.getDate() - 1);
  startDate = startDate.toISOString();
  let endDate = new Date(req.query.edt).toISOString();  
  const db = DBConn.getConnection();
  const collection = await db.collection('symbolhistory');
  const query = {
    symbolId: ObjectId(req.params.symbolId),
    Date: {
      "$gt": startDate,
      "$lte": endDate
    }
  };
  const count = await collection.countDocuments(query)
  res.json({
    count
  })
});

router.get('/symbols', async (req, res) => {
  const db = DBConn.getConnection();
  db
  .collection('symbols')
  .find({})
  .toArray((err, data) => {
    if(err) {
      res.status(400).send('Server error.');
    } else {
      res.json(data)
    }
  });
});

router.get('/symbols/:symbolId', async (req, res) => {
  const db = DBConn.getConnection();
  db
  .collection('symbols')
  .findOne(ObjectId(req.params.symbolId), (err, data) => {
    if(err) {
      res.status(400).send('Server error.');
    } else {
      res.json(data)
    }
  });
});

router.get('/search/symbols', async (req, res) => {
  const db = DBConn.getConnection();
  db
  .collection('symbols')
  //.find({ $text: { $search: req.query.s }}) // only match whole word
  .find({ symbol: { $regex: `${req.query.s}`, $options: "i" } })
  .toArray((err, data) => {
    if(err) {
      res.status(400).send('Server error.');
    } else {
      res.json(data)
    }
  });
});

module.exports = router;