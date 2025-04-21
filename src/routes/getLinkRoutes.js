const express = require('express');
const router = express.Router();
const getLinkController = require('../controllers/getLinkController');


// Define endpoint
router.get('/:shortLink', getLinkController.getShortLink)

module.exports = router;
