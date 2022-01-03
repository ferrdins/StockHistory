const express = require('express');
const securitiesRouter = require('./securities');
const router = express.Router();

router.use('/securities', securitiesRouter);
module.exports = router;
