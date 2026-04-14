const express = require('express');
const router = express.Router();
module.exports = router;


const notifications_R = require('./notifications_R');
router.use('/NF',[],notifications_R);