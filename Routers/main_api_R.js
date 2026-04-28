const express = require('express');
const router = express.Router();
module.exports = router;


const notifications_R = require('./notifications_R');
router.use('/NF',[],notifications_R);

const users_R = require('./users_R');
router.use('/US', [], users_R);