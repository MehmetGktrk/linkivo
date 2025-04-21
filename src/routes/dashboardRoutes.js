const express = require("express");
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');


router.get('/getAllShortLink/:username', dashboardController.getAllShortLink)
router.get('/getAllShortLink/:username/:shortLink', dashboardController.getShortLinkData)

module.exports = router