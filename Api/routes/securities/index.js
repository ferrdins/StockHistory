const express = require('express');
const historyRouter = require('./history');
const router = express.Router();

router.use('/', historyRouter);
module.exports = router;